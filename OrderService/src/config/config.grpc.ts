import * as dotenv from "dotenv";
dotenv.config();

const GRPCConfig = {
  authURL: process.env.AUTH_GRPC_URL,
  inventoryURL: process.env.INVENTORY_GRPC_URL,
  cartURL: process.env.CART_GRPC_URL,
  productURL: process.env.PRODUCT_GRPC_URL,
};

export { GRPCConfig };
