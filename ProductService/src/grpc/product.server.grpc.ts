import {
  sendUnaryData,
  Server,
  ServerCredentials,
  ServerUnaryCall,
} from "@grpc/grpc-js";
import { ProductServiceService } from "../proto/product/product_grpc_pb";
import {
  GetProductByIdRequest,
  GetProductByIdResponse,
} from "../proto/product/product_pb";
import { findProductById } from "../models/repository/product.repo";
import { isHex } from "../utils";

const grpcServer = new Server();

grpcServer.addService(ProductServiceService, {
  getProductById: async (
    call: ServerUnaryCall<GetProductByIdRequest, GetProductByIdResponse>,
    cb: sendUnaryData<GetProductByIdResponse>
  ) => {
    console.log(call);
    const request = call.request;
    const productId = request.getProductid();
    const response = new GetProductByIdResponse();
    if (isHex(productId) || productId.length === 24) {
      const product = await findProductById(productId);
      console.log(product);
      if (product) {
        response.setProductid(product._id.toString());
        response.setName(product.product_name);
        response.setPrice(Number(product.product_price));
        response.setShopid(product.product_shop.toString());
        response.setQuantity(product.product_quantity);
      }
    }
    cb(null, response);
  },
});

const startGRPCProductService = () => {
  const grpcProductPort = process.env.GRPC_PORT;

  if (!grpcProductPort) {
    throw new Error("GRPC port is missing");
  }

  grpcServer.bindAsync(
    `localhost:${grpcProductPort}`,
    ServerCredentials.createInsecure(),
    () => {
      console.log(`GRPC Auth Service is running on port ${grpcProductPort}`);
    }
  );
};

export { startGRPCProductService };
