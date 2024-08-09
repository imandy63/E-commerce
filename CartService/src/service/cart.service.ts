import { BadRequestError, NotFoundError } from "../core/error.response";
import { redisInstance } from "../dbs/init.redis";
import { findProductById } from "../grpc/product.grpc";
import {
  CartCreate,
  CartDeleteProduct,
  CartGet,
  CartUpdate,
  CartUpdateQuantity,
} from "../interfaces/cart.interface";
import { cart } from "../model/cart.model";

class CartService {
  static async createCart({ userId, product }: CartCreate) {
    const query = { cart_userId: userId, cart_state: "active" },
      updateOrInsert = {
        $addToSet: {
          cart_products: product,
        },
        cart_count_product: 1,
      },
      options = { upsert: true, new: true };
    return await cart.findOneAndUpdate(query, updateOrInsert, options);
  }

  static async updateCartProductQuantity({
    userId,
    product,
  }: CartUpdateQuantity) {
    const { productId, quantity } = product;
    const query = {
        cart_userId: userId,
        "cart_products.productId": productId,
        cart_state: "active",
      },
      updateSet = {
        $inc: {
          "cart_products.$.quantity": quantity,
        },
      },
      options = { upsert: true, new: true };
    return await cart.findOneAndUpdate(query, updateSet, options);
  }

  static async getCart({ userId }: CartGet) {
    const cacheCart = await redisInstance.get(`cart::${userId}`);
    if (!cacheCart) {
      const result = await cart
        .findOne({
          cart_userId: userId,
        })
        .lean();
      await redisInstance.set(`cart::${userId}`, JSON.stringify(result));
      return result;
    }
    await redisInstance.set(`cart::${userId}`, cacheCart);
    return JSON.parse(cacheCart);
  }

  static async addProductToCart({ product, userId }: CartCreate) {
    const foundProduct = await findProductById(product.productId);
    if (!foundProduct) {
      throw new NotFoundError("Product doesn't exist");
    }

    if (foundProduct.shopId !== product.shopId) {
      throw new NotFoundError("Product doesn't belong to that shop");
    }

    if (foundProduct.quantity < product.quantity) {
      throw new BadRequestError("Product quantity exceeded");
    }

    const userCart = await cart.findOne({ cart_userId: userId });

    if (!userCart) {
      return await CartService.createCart({ userId, product });
    }

    if (!userCart.cart_products.length || userCart.cart_products.length == 0) {
      userCart.cart_products = [product];
      userCart.cart_count_product = 1;
      return await userCart.save();
    }

    if (
      !userCart.cart_products.find(
        (item) => item.productId === product.productId
      )
    ) {
      userCart.cart_products = [...userCart.cart_products, product];
      userCart.cart_count_product += 1;
      return await userCart.save();
    }

    await redisInstance.delete(`cart::${userId}`);

    return await CartService.updateCartProductQuantity({ userId, product });
  }

  static async updateCart({ userId, shop_order }: CartUpdate) {
    const { productId, quantity, old_quantity } = shop_order.item_product;

    const foundProduct = await findProductById(productId);
    if (!foundProduct) {
      throw new NotFoundError("Product doesn't exist");
    }

    if (foundProduct.shopId !== shop_order.shopId) {
      throw new NotFoundError("Product doesn't belong to that shop");
    }

    if (foundProduct.quantity < shop_order.item_product.quantity) {
      throw new BadRequestError("Product quantity exceeded");
    }

    if (quantity === 0) {
      return await CartService.deleteProductFromUserCart({ userId, productId });
    }

    await redisInstance.delete(`cart::${userId}`);

    return await CartService.updateCartProductQuantity({
      userId,
      product: {
        productId,
        quantity: quantity - old_quantity,
      },
    });
  }

  static async deleteProductFromUserCart({
    userId,
    productId,
  }: CartDeleteProduct) {
    const query = { cart_userId: userId, cart_state: "active" },
      updateSet = {
        $pull: {
          cart_products: {
            productId,
          },
        },
      };
    await cart.updateOne(query, updateSet);

    const userCart = await cart.findOne({ cart_userId: userId });

    if (!userCart) {
      throw new NotFoundError("Something went wrong!");
    }

    userCart.cart_count_product = userCart.cart_products.length;

    userCart.save();

    await redisInstance.delete(`cart::${userId}`);

    return userCart;
  }
}

export { CartService };
