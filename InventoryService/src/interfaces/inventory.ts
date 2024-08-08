import { Types } from "mongoose";

export type StockInventoryAdd = {
  stock: number;
  productId: Types.ObjectId;
  shopId: Types.ObjectId;
  location: string | null;
};

export type InventoryProduct = {
  stock: number;
  productId: string;
  shopId: string;
};
