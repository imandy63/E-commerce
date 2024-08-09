import { credentials } from "@grpc/grpc-js";
import { ProductServiceClient } from "../proto/product/product_grpc_pb";
import { GetProductByIdRequest } from "../proto/product/product_pb";
import { GRPCConfig } from "../config/config.grpc";
import { CartProductOrigin } from "../interfaces/order";

const productURL = GRPCConfig.productURL;
if (!productURL) {
  throw new Error("GRPC Auth URL is missing");
}

const productClient = new ProductServiceClient(
  productURL,
  credentials.createInsecure()
);

const findProductById = async (productId: string) => {
  const request = new GetProductByIdRequest();
  request.setProductid(productId);
  return new Promise<CartProductOrigin>((resolve, reject) => {
    productClient.getProductById(request, (err, response) => {
      if (err || !response || response === undefined) {
        reject("Service error");
      } else {
        const productId = response.getProductid();
        if (productId) {
          resolve({
            productId: productId,
            price: response.getPrice(),
            shopId: response.getShopid(),
            name: response.getName(),
            quantity: response.getQuantity(),
          });
        } else {
          reject(null);
        }
      }
    });
  });
};

export { findProductById };
