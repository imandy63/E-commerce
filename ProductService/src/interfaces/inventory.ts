import { Types } from "mongoose";

export type StockInventoryAdd = {
  stock: number;
  productId: string;
  shopId: string;
};
