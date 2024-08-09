import { Schema, model } from "mongoose";
import { ORDER_STATUS } from "../constants/order.constant";

const DOCUMENT_NAME = "Order";
const COLLECTION_NAME = "Orders";

var orderSchema = new Schema(
  {
    order_userId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      require: true,
    },
    order_checkout: {
      type: Object,
      default: {},
    },
    /*
      {
          street,
          city,
          state,
          country,
      }
      */
    order_shipping: {
      type: Object,
      default: {},
    },
    order_products: {
      type: Array,
      default: [],
      require: true,
    },
    order_status: {
      type: String,
      enum: {
        values: Object.values(ORDER_STATUS),
      },
      default: ORDER_STATUS.PENDING,
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

export const order = model(DOCUMENT_NAME, orderSchema);
