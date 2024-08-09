import express from "express";
import OrderRouter from "./order";
const router = express.Router();

router.use("/v1/api/order/", OrderRouter);

router.use("/", (req, res) => {
  res.send("Hello world");
});

export { router };
