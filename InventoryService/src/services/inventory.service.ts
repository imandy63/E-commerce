"use strict";

import { BadRequestError, NotFoundError } from "../core/error.response";
import { StockInventoryAdd, inventory } from "../models/inventory.model";
import { convertToObjectIdMongoose, isHex } from "../utils";

export class InventoryService {
  static async addStockToInventory({
    stock,
    productId,
    shopId,
  }: StockInventoryAdd) {
    console.log(productId);
    if (!isHex(productId)) {
      throw new BadRequestError("Wrong format");
    }
    const query = {
        inven_shopId: convertToObjectIdMongoose(shopId),
        inven_productId: convertToObjectIdMongoose(productId),
      },
      updateSet = {
        $inc: { inven_stock: stock },
      },
      options = { upsert: true, new: true };
    await inventory.findOneAndUpdate(query, updateSet, options);
    return true;
  }

  static async getStockByProductId(productId: string) {
    return await inventory.findOne({
      inven_productId: productId,
    });
  }
}
