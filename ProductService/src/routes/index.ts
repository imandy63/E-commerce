import express from "express";
import productRouter from "./product";
const router = express.Router();

router.use("/v1/api/product", productRouter);

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "OK",
  });
});

export default router;
