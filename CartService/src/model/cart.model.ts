import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";

const cartSchema = new Schema(
  {
    cart_state: {
      type: String,
      enum: ["active", "completed", "failed", "pending"],
      default: "active",
    },
    cart_products: {
      type: Array,
      default: [],
      required: true,
    },
    cart_count_product: {
      type: Number,
      default: 0,
    },
    cart_userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createAt: "createdOn",
      updatedAt: "modifiedOn",
    },
    collection: COLLECTION_NAME,
  }
);

export const cart = model(DOCUMENT_NAME, cartSchema);
