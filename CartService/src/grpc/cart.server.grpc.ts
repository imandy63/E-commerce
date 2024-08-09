import {
  sendUnaryData,
  Server,
  ServerCredentials,
  ServerUnaryCall,
} from "@grpc/grpc-js";
import { CartServiceService } from "../proto/cart/cart_grpc_pb";
import {
  CartProduct,
  CartRequest,
  CartResponse,
  RemoveCartItemsRequest,
  RemoveCartItemsResponse,
} from "../proto/cart/cart_pb";
import {
  getCartDetails,
  removeCartItemsByUserId,
} from "../model/repository/cart.repository";
import { CartProductOrigin } from "../interfaces/cart.interface";

const cartGRPCServer = new Server();
cartGRPCServer.addService(CartServiceService, {
  getCartDetails: async (
    call: ServerUnaryCall<CartRequest, CartResponse>,
    cb: sendUnaryData<CartResponse>
  ) => {
    const request = call.request;
    console.log(request);
    const userId = request.getUserid();
    const cartId = request.getCartid();

    const response = new CartResponse();

    const foundCart = await getCartDetails(userId, cartId);

    if (!foundCart) {
      response.setCartCountProduct(0);
    } else {
      response.setCartCountProduct(foundCart.cart_count_product);
      foundCart.cart_products.forEach((product: CartProductOrigin) => {
        const responseProduct = new CartProduct();
        responseProduct.setName(product.name);
        responseProduct.setQuantity(product.quantity);
        responseProduct.setProductid(product.productId);
        responseProduct.setPrice(product.price);
        responseProduct.setShopid(product.shopId);
        response.setCartProductsList([
          ...response.getCartProductsList(),
          responseProduct,
        ]);
      });
    }
    cb(null, response);
  },
  removeCartItems: async (
    call: ServerUnaryCall<RemoveCartItemsRequest, RemoveCartItemsResponse>,
    cb: sendUnaryData<RemoveCartItemsResponse>
  ) => {
    const request = call.request;
    const userId = request.getUserid();
    const response = new RemoveCartItemsResponse();
    try {
      await removeCartItemsByUserId(userId);
      response.setSuccess(true);
    } catch (err) {
      response.setSuccess(false);
    }
    cb(null, response);
  },
});

export const startGRPCCartServer = () => {
  const grpcCartPort = process.env.GRPC_PORT;

  if (!grpcCartPort) {
    throw new Error("GRPC port is missing");
  }

  cartGRPCServer.bindAsync(
    `localhost:${grpcCartPort}`,
    ServerCredentials.createInsecure(),
    () => {
      console.log(`GRPC Cart Service is running on port ${grpcCartPort}`);
    }
  );
};
