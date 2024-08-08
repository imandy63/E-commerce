import express from "express";
import { asyncHandler } from "../../helpers/asyncHandler";
import { authenticationGRPC } from "../../auth/authentication";
import CartController from "../../controller/cart.controller";
const router = express.Router();

router.use(asyncHandler(authenticationGRPC));
/////////////////
router.post("/", asyncHandler(CartController.addToCart));
router.delete("/", asyncHandler(CartController.deleteProductInCart));
router.post("/update", asyncHandler(CartController.updateCart));

// Query
router.get("/", asyncHandler(CartController.getUserCart));

export default router;
