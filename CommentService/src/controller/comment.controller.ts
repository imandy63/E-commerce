import { CommentService } from "../service/comment.service";
import { CREATED, SuccessResponse } from "../core/success.response";
import { Request, Response, NextFunction } from "express";

class CommentController {
  createComment = async (req: Request, res: Response, next: NextFunction) => {
    new CREATED({
      message: "Create comment successfully!",
      metadata: await CommentService.createComment({
        ...req.body,
      }),
    }).send(res);
  };

  getAllCommentsByParentId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get comments successfully!",
      metadata: await CommentService.getCommentByParentId({
        productId: req.query.productId as string,
        parentId: req.query.parentId?.toString(),
        offset: Number(req.query.offset),
        limit: Number(req.query.limit),
      }),
    }).send(res);
  };

  deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Delete comments successfully!",
      metadata: await CommentService.deleteComment({
        ...req.body,
      }),
    }).send(res);
  };
}

export default new CommentController();
