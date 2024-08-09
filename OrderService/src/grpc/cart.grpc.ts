import { CartRequest, RemoveCartItemsRequest } from "../proto/cart/cart_pb";
import { CartServiceClient } from "../proto/cart/cart_grpc_pb";
import { GRPCConfig } from "../config/config.grpc";
import { credentials } from "@grpc/grpc-js";
import { CartProductOrigin, CartProductsResponse } from "../interfaces/order";

const cartUrl = GRPCConfig.cartURL;

if (!cartUrl) {
  throw new Error("GRPC Cart URL is missing");
}

const cartServiceClient = new CartServiceClient(
  cartUrl,
  credentials.createInsecure()
);

const findCartById = (userId: string, cartId: string) => {
  const request = new CartRequest();
  request.setCartid(cartId);
  request.setUserid(userId);
  return new Promise<CartProductsResponse>((resolve, reject) => {
    cartServiceClient.getCartDetails(request, (err, response) => {
      if (err) {
        reject("Service err");
      } else {
        const productsCount = response.getCartCountProduct();
        const productsList = response.getCartProductsList();
        const cart_products: CartProductOrigin[] = [];
        productsList.map((productResponse) => {
          cart_products.push({
            name: productResponse.getName(),
            quantity: productResponse.getQuantity(),
            shopId: productResponse.getProductid(),
            price: productResponse.getPrice(),
            productId: productResponse.getProductid(),
          });
        });
        resolve({
          cart_count_product: productsCount,
          cart_products,
        });
      }
    });
  });
};

const removeCartItems = (userId: string) => {
  const request = new RemoveCartItemsRequest();
  request.setUserid(userId);
  return new Promise<Boolean>((resolve, reject) => {
    cartServiceClient.removeCartItems(request, (err, response) => {
      if (err) {
        resolve(false);
      } else {
        const success = response.getSuccess();
        resolve(success);
      }
    });
  });
};

export { findCartById, removeCartItems };
