import express from "express";
import CartRouter from "./cart";

const router = express.Router();

router.use("/v1/api/cart", CartRouter);

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "OK",
  });
});

export default router;
