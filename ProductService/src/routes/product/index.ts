"use strict";

import express from "express";
const router = express.Router();
import { Controller } from "../../controller/product.controller";
import { asyncHandler } from "../../helpers/asyncHandler";
import { authenticationGRPC } from "../../auth/authentication";

//
router.get(
  "/search/:keySearch",
  asyncHandler(Controller.getListSearchProducts)
);
router.get("", asyncHandler(Controller.findAllProducts));
router.get("/:product_id", asyncHandler(Controller.findProduct));
// authentication

router.use(asyncHandler(authenticationGRPC));

/////////////////
router.post("", asyncHandler(Controller.createProduct));
router.patch("/:productId", asyncHandler(Controller.updateProduct));
router.post("/publish/:id", asyncHandler(Controller.publishProduct));
router.post("/unpublish/:id", asyncHandler(Controller.unpublishProduct));

// Query
router.get("/drafts/all", asyncHandler(Controller.getAllDraftsForShop));
router.get("/publish/all", asyncHandler(Controller.getAllPublishedForShop));

export default router;
