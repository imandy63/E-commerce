import {
  sendUnaryData,
  Server,
  ServerCredentials,
  ServerUnaryCall,
} from "@grpc/grpc-js";
import { InventoryServiceService } from "../proto/inventory/inventory_grpc_pb";
import {
  AddInventoryRequest,
  AddInventoryResponse,
  ReserveInventoryRequest,
  ReserveInventoryResponse,
} from "../proto/inventory/inventory_pb";
import { findProductById } from "./product.grpc";
import { InventoryService } from "../services/inventory.service";
import { reserveInventory } from "../models/repository/inventory.repository";

const grpcServer = new Server();

grpcServer.addService(InventoryServiceService, {
  addInventoryItem: async (
    call: ServerUnaryCall<AddInventoryRequest, AddInventoryResponse>,
    cb: sendUnaryData<AddInventoryResponse>
  ) => {
    const request: AddInventoryRequest = call.request;
    const productId = request.getProductid();
    const stock = request.getStock();
    const shopId = request.getShopid();

    const response: AddInventoryResponse = new AddInventoryResponse();

    try {
      const foundProduct = await findProductById(productId);
      console.log(foundProduct);
      if (!foundProduct) {
        response.setSuccess(false);
      } else {
        if (foundProduct.shopId != shopId) {
          response.setSuccess(false);
        } else {
          await InventoryService.addStockToInventory({
            stock,
            productId,
            shopId,
          });
          response.setSuccess(true);
        }
      }
    } catch (err) {
      response.setSuccess(false);
    }
    cb(null, response);
  },
  reserveInventory: async (
    call: ServerUnaryCall<ReserveInventoryRequest, ReserveInventoryResponse>,
    cb: sendUnaryData<ReserveInventoryResponse>
  ) => {
    const request: ReserveInventoryRequest = call.request;
    const productId = request.getProductid();
    const quantity = request.getQuantity();
    const cartId = request.getCartid();
    const response: ReserveInventoryResponse = new ReserveInventoryResponse();
    try {
      const reserve = await reserveInventory({ cartId, quantity, productId });
      response.setModifiedcount(reserve.modifiedCount);
    } catch (err) {
      response.setModifiedcount(0);
    }
    cb(null, response);
  },
});

const startGRPCInventoryService = () => {
  const grpcInventoryPort = process.env.GRPC_PORT;

  if (!grpcInventoryPort) {
    throw new Error("GRPC port is missing");
  }

  grpcServer.bindAsync(
    `localhost:${grpcInventoryPort}`,
    ServerCredentials.createInsecure(),
    () => {
      console.log(
        `GRPC Inventory service is running on port ${grpcInventoryPort}`
      );
    }
  );
};

export { startGRPCInventoryService };
