import { NotFoundError, BadRequestError } from "../core/error.response";
import { findCartById, removeCartItems } from "../grpc/cart.grpc";
import { order } from "../model/order.model";
import { ORDER_STATUS } from "../constants/order.constant";
import {
  OrderCreate,
  OrderInteraction,
  OrderReview,
  OrdersGet,
} from "../interfaces/order";
import { findProductById } from "../grpc/product.grpc";
import { convertToObjectIdMongoose } from "../utils";
import { acquireLock, releaseLock } from "./redis.service";

class OrderService {
  static async checkoutReview({ cartId, userId }: OrderReview) {
    //
    let foundCart;
    try {
      foundCart = await findCartById(userId, cartId);
      if (!foundCart) {
        throw new NotFoundError("User cart does not exist!");
      }
    } catch (err) {
      throw new BadRequestError("Error");
    }

    const shop_orders = [];

    const checkout_order = {
      totalPrice: 0,
      shippingFee: 0,
      totalCheckout: 0,
    };

    const cart_products = foundCart.cart_products;
    for (let i = 0; i < cart_products.length; i++) {
      const checkedProduct = await findProductById(cart_products[i].productId);
      if (!checkedProduct) {
        throw new BadRequestError("Order is wrong");
      }

      if (checkedProduct.quantity < cart_products[i].quantity) {
        throw new BadRequestError("Quantity exceeded! Please update your cart");
      }

      const checkoutPrice = checkedProduct.price * checkedProduct.quantity;
      checkout_order.totalPrice += checkoutPrice;

      const itemCheckout = {
        price: checkoutPrice,
        item_products: checkedProduct,
      };

      //final
      shop_orders.push(itemCheckout);
    }

    return {
      shop_orders,
      checkout_order,
    };
  }

  //order

  static async orderByUser({ cartId, userId, user_address }: OrderCreate) {
    const { shop_orders, checkout_order } = await OrderService.checkoutReview({
      cartId,
      userId,
    });

    //take a look at the quantity if it surpass the rest of inventory

    const products = shop_orders.flatMap((order) => order.item_products);

    const acquireProduct = [];

    //
    for (let i = 0; i < products.length; i++) {
      const { productId, quantity } = products[i];
      const keyLock = await acquireLock({ productId, quantity, cartId });
      acquireProduct.push(keyLock ? true : false);
      if (keyLock) {
        await releaseLock(keyLock);
      }
    }

    if (acquireProduct.includes(false)) {
      throw new BadRequestError(
        "Some products have been updated! Please try again"
      );
    }

    const newOrder = new order({
      order_userId: userId,
      order_checkout: checkout_order,
      order_shipping: user_address,
      order_status: ORDER_STATUS.PENDING,
      order_products: shop_orders,
    });

    if (newOrder) {
      // remove product in cart
      const success = await removeCartItems(userId);
      if (success) {
        newOrder.save();
      }
    }

    return newOrder;
  }

  static async getOrdersByUser({ userId }: OrdersGet) {
    return await order
      .find({ order_userId: userId })
      .select([
        "_id",
        "order_checkout",
        "order_shipping",
        "order_status",
        "created_at",
      ]);
  }

  static async getOrderDetailByUser({ userId, orderId }: OrderInteraction) {
    return await order.findOne({ order_userId: userId, _id: orderId });
  }
}

export { OrderService };
