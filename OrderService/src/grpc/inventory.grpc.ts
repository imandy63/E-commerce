import { GRPCConfig } from "../config/config.grpc";
import { credentials } from "@grpc/grpc-js";
import { InventoryServiceClient } from "../proto/inventory/inventory_grpc_pb";
import { ReserveInventoryRequest } from "../proto/inventory/inventory_pb";

const inventoryUrl = GRPCConfig.inventoryURL;

if (!inventoryUrl) {
  throw new Error("GRPC Inventory URL is missing");
}

const cartServiceClient = new InventoryServiceClient(
  inventoryUrl,
  credentials.createInsecure()
);

const reserveInventory = async (
  cartId: string,
  quantity: number,
  productId: string
) => {
  const request = new ReserveInventoryRequest();
  request.setCartid(cartId);
  request.setQuantity(quantity);
  request.setProductid(productId);
  return new Promise<Number>((resolve, reject) => {
    cartServiceClient.reserveInventory(request, (err, response) => {
      if (err) {
        resolve(0);
      } else {
        resolve(response.getModifiedcount());
      }
    });
  });
};

export { reserveInventory };
