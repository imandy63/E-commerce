import * as dotenv from "dotenv";
dotenv.config();

const GRPCConfig = {
  productURL: process.env.PRODUCT_GRPC_URL,
};

export { GRPCConfig };
