"use strict";

import { InferSchemaType, Schema, model } from "mongoose";

const DOCUMENT_NAME = "Inventory";
const COLLECTION_NAME = "Inventories";

var inventorySchema = new Schema(
  {
    inven_productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      require: true,
      unique: true,
    },
    inven_stock: {
      type: Number,
      require: true,
    },
    inven_shopId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    reservation: {
      type: Array,
      default: [],
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "modified_at",
    },
  }
);

export const inventory = model(DOCUMENT_NAME, inventorySchema);

export type Product = InferSchemaType<typeof inventorySchema>;

export type StockInventoryAdd = {
  stock: number;
  productId: string;
  shopId: string;
};
