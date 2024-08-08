import { credentials } from "@grpc/grpc-js";
import { GRPCConfig } from "../config/config.grpc";
import { ProductServiceClient } from "../proto/product/product_grpc_pb";
import { GetProductByIdRequest } from "../proto/product/product_pb";
type productValidateType = {
  isExists: boolean;
};

const productGrpcPort = GRPCConfig.productURL;
if (!productGrpcPort) {
  throw new Error("GRPC product URL is missing");
}

const productService = new ProductServiceClient(
  productGrpcPort,
  credentials.createInsecure()
);

const checkProductExists = (productId: string) => {
  const getProductByIdRequest = new GetProductByIdRequest();
  getProductByIdRequest.setProductid(productId);
  return new Promise<productValidateType>((resolve, reject) => {
    productService.getProductById(getProductByIdRequest, (err, response) => {
      if (err) {
        reject("Service error");
      }
      const foundProduct = response.getProductid();
      if (foundProduct) {
        resolve({ isExists: true });
      }
      resolve({ isExists: false });
    });
  });
};

export { checkProductExists };
