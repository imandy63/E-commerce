import express from "express";
import { validateTokenGRPC } from "../../grpc/auth.grpc";
import { asyncHandler } from "../../helper/asyncHandler";
import { authenticationGRPC } from "../../auth/authentication";
import CommentController from "../../controller/comment.controller";

const router = express.Router();

// Query
router.get("", asyncHandler(CommentController.getAllCommentsByParentId));

//AUTH
router.use(asyncHandler(authenticationGRPC));

///////////////////////////////
router.post("", asyncHandler(CommentController.createComment));
router.delete("", asyncHandler(CommentController.deleteComment));

export default router;
