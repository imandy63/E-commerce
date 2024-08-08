import express from "express";
import { asyncHandler } from "../../helpers/asyncHandler";
import inventoryController from "../../controllers/inventory.controller";

const router = express.Router();

router.get("/:productId", asyncHandler(inventoryController.getStockById));

export default router;
