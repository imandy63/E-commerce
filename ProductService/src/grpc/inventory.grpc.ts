import { GRPCConfig } from "../config/config.grpc";
import { credentials } from "@grpc/grpc-js";
import { InventoryServiceClient } from "../proto/inventory/inventory_grpc_pb";
import { AddInventoryRequest } from "../proto/inventory/inventory_pb";
import { StockInventoryAdd } from "../interfaces/inventory";

type isAdded = {
  success: boolean;
};

const inventoryURL = GRPCConfig.inventoryURL;

if (!inventoryURL) {
  throw new Error("GRPC Inventory URL is missing");
}

const inventoryClient = new InventoryServiceClient(
  inventoryURL,
  credentials.createInsecure()
);

const addIntoInventory = async ({
  productId,
  stock,
  shopId,
}: StockInventoryAdd) => {
  const request = new AddInventoryRequest();
  request.setProductid(productId);
  request.setShopid(shopId);
  request.setStock(stock);
  return new Promise<isAdded>((resolve, reject) => {
    inventoryClient.addInventoryItem(request, (err, response) => {
      if (err) {
        console.log(err);
        reject("Service error");
      } else {
        if (response.getSuccess()) {
          resolve({ success: true });
        } else {
          resolve({ success: false });
        }
      }
    });
  });
};

export { addIntoInventory };
