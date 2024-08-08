import { credentials } from "@grpc/grpc-js";
import { GRPCConfig } from "../config/config.grpc";
import { ProductServiceClient } from "../proto/product/product_grpc_pb";
import { GetProductByIdRequest } from "../proto/product/product_pb";
import { InventoryProduct } from "../interfaces/inventory";

const productGrpcPort = GRPCConfig.productURL;
if (!productGrpcPort) {
  throw new Error("GRPC product URL is missing");
}

const productService = new ProductServiceClient(
  productGrpcPort,
  credentials.createInsecure()
);

const findProductById = async (productId: string) => {
  const getProductByIdRequest = new GetProductByIdRequest();
  getProductByIdRequest.setProductid(productId.toString());
  return new Promise<InventoryProduct>((resolve, reject) => {
    productService.getProductById(getProductByIdRequest, (err, response) => {
      console.log({ err, response });
      if (err || !response || response === undefined) {
        reject("Service error");
      } else {
        const productId = response.getProductid();
        resolve({
          productId: productId,
          stock: response.getQuantity(),
          shopId: response.getShopid(),
        });
      }
    });
  });
};

export { findProductById };
