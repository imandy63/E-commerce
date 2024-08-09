import express from "express";
import { authenticationGRPC } from "../../auth/authentication";
import { asyncHandler } from "../../helpers/asyncHandler";
import OrderController from "../../controller/order.controller";

const router = express.Router();

router.use(asyncHandler(authenticationGRPC));

router.post("", asyncHandler(OrderController.review));
router.post("/confirm", asyncHandler(OrderController.confirm));

router.get("", asyncHandler(OrderController.getOrdersHistory));
router.get("/details", asyncHandler(OrderController.getOrderDetails));
export default router;
