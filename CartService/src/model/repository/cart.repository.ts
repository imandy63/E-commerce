import { convertToObjectIdMongoose } from "../../utils";
import { cart } from "../cart.model";

export const getCartDetails = async (userId: string, cartId: string) => {
  return await cart
    .findOne({
      cart_userId: userId,
      _id: convertToObjectIdMongoose(cartId),
    })
    .select(["cart_count_product", "cart_products"])
    .lean();
};

export const removeCartItemsByUserId = async (userId: string) => {
  return await cart.updateOne(
    {
      cart_userId: userId,
    },
    {
      $set: {
        cart_count_product: 0,
        cart_products: [],
      },
    }
  );
};
