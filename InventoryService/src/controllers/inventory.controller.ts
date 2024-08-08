import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../core/success.response";
import { InventoryService } from "../services/inventory.service";

class InventoryController {
  getStockById = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Stock found successfully",
      metadata: await InventoryService.getStockByProductId(
        req.params.productId
      ),
    }).send(res);
  };
}

export default new InventoryController();
