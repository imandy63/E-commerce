import { Request, Response, NextFunction } from "express";
import { CREATED, SuccessResponse } from "../core/success.response";
import { CartService } from "../service/cart.service";

class CartController {
  addToCart = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Create new cart successfully",
      metadata: await CartService.addProductToCart({
        ...req.body,
        userId: req.body.userId,
      }),
    }).send(res);
  };

  updateCart = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Update cart successfully!",
      metadata: await CartService.updateCart({
        ...req.body,
        userId: req.body.userId,
      }),
    }).send(res);
  };

  deleteProductInCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Delete cart item successfully!",
      metadata: await CartService.deleteProductFromUserCart({
        ...req.body,
        userId: req.body.userId,
      }),
    }).send(res);
  };

  // Need to be changed if user model is added
  getUserCart = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Get products in cart successfully!",
      metadata: await CartService.getCart({
        userId: req.body.userId,
      }),
    }).send(res);
  };
}

export default new CartController();
