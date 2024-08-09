import { sortBy } from "lodash";
import { comment } from "../model/comment.model";
import { convertToObjectIdMongoose } from "../utils";
import { NotFoundError } from "../core/error.response";
import { checkProductExists } from "../grpc/product.grpc";
import {
  CommentCreate,
  CommentDelete,
  CommentGet,
} from "../interfaces/comment";

class CommentService {
  static async createComment({
    productId,
    userId,
    content,
    parentId = null,
  }: CommentCreate) {
    const newComment = new comment({
      comment_productId: productId,
      comment_userId: userId,
      comment_content: content,
      comment_parentId: parentId,
    });

    const foundProduct = await checkProductExists(productId);
    if (!foundProduct.isExists) {
      throw new NotFoundError("Product is not found!");
    }

    let rightValue;
    if (parentId) {
      // reply comment
      const parentComment = await comment.findById(parentId);

      if (!parentComment) {
        throw new NotFoundError("Comment is not found!");
      }

      rightValue = parentComment.comment_right;
      //updateMany
      await comment.updateMany(
        {
          comment_productId: convertToObjectIdMongoose(productId),
          comment_right: {
            $gte: rightValue,
          },
        },
        {
          $inc: {
            comment_right: 2,
          },
        }
      );

      await comment.updateMany(
        {
          comment_productId: convertToObjectIdMongoose(productId),
          comment_left: {
            $gt: rightValue,
          },
        },
        {
          $inc: {
            comment_left: 2,
          },
        }
      );
    } else {
      const maxRightValue = await comment.findOne(
        {
          comment_productId: convertToObjectIdMongoose(productId),
        },
        "comment_right",
        {
          sort: { comment_right: -1 },
        }
      );

      if (maxRightValue) {
        rightValue = maxRightValue.comment_right + 1;
      } else {
        rightValue = 1;
      }
    }
    newComment.comment_left = rightValue;
    newComment.comment_right = rightValue + 1;
    console.log(newComment);

    await newComment.save();
    return newComment;
  }

  static async getCommentByParentId({
    productId,
    parentId,
    limit = 50,
    offset = 0,
  }: CommentGet) {
    if (parentId) {
      const parent = await comment.findById(parentId);

      if (!parent) {
        throw new NotFoundError("Comment is not found!");
      }

      const comments = await comment
        .find({
          comment_productId: convertToObjectIdMongoose(productId),
          comment_parentId: parentId,
        })
        .select({
          comment_content: 1,
          comment_right: 1,
          comment_left: 1,
          comment_parentId: 1,
        })
        .sort({
          comment_left: 1,
        })
        .skip(offset)
        .limit(limit);

      return comments;
    }

    const comments = await comment
      .find({
        comment_productId: convertToObjectIdMongoose(productId),
        comment_parentId: parentId,
      })
      .select({
        comment_content: 1,
        comment_right: 1,
        comment_left: 1,
        comment_parentId: 1,
      })
      .sort({
        comment_left: 1,
      })
      .skip(offset)
      .limit(limit);

    return comments;
  }

  static async deleteComment({ productId, commentId }: CommentDelete) {
    const foundProduct = await checkProductExists(productId);
    if (!foundProduct.isExists) {
      throw new NotFoundError("Product is not found!");
    }

    const foundComment = await comment.findById(commentId);
    if (!foundComment) {
      throw new NotFoundError("Comment is not found!");
    }

    const leftValue = foundComment.comment_left;
    const rightValue = foundComment.comment_right;

    const width = rightValue - leftValue - 1;

    await comment.deleteMany({
      comment_productId: convertToObjectIdMongoose(productId),
      comment_left: {
        $gte: leftValue,
      },
      comment_right: {
        $lte: rightValue,
      },
    });

    await comment.updateMany(
      {
        comment_productId: convertToObjectIdMongoose(productId),
        comment_left: {
          $gt: leftValue,
        },
      },
      {
        $inc: {
          comment_left: -width,
        },
      }
    );

    await comment.updateMany(
      {
        comment_productId: convertToObjectIdMongoose(productId),
        comment_right: {
          $gt: rightValue,
        },
      },
      {
        $inc: {
          comment_right: -width,
        },
      }
    );
    return { isDeleted: true };
  }
}

export { CommentService };
