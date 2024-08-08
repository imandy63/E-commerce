import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "Comment";
const COLLECTION_NAME = "Comments";

const commentSchema = new Schema(
  {
    comment_productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    comment_userId: {
      type: Number,
      default: 1,
    },
    comment_content: {
      type: String,
      default: "text",
    },
    comment_left: {
      type: Number,
      default: 0,
    },
    comment_right: {
      type: Number,
      default: 0,
    },
    comment_parentId: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME,
    },
    comment_isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "modified_at",
    },
    collection: COLLECTION_NAME,
  }
);

export const comment = model(DOCUMENT_NAME, commentSchema);
