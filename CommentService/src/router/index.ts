import express from "express";
import commentRouter from "./comment";

const router = express.Router();

router.use("/v1/api/comment", commentRouter);

router.get("/", (req, res, next) => {
  return res.send("hello world");
});

export default router;
