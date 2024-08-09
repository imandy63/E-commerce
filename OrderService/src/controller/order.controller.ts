import { CREATED, SuccessResponse } from "../core/success.response";
import { Request, Response, NextFunction } from "express";
import { OrderService } from "../service/order.service";

class OrderController {
  review = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Review successfully",
      metadata: await OrderService.checkoutReview({
        ...req.body,
      }),
    }).send(res);
  };

  confirm = async (req: Request, res: Response, next: NextFunction) => {
    new CREATED({
      message: "Create new order successfully",
      metadata: await OrderService.orderByUser({
        ...req.body,
      }),
    }).send(res);
  };

  getOrdersHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get orders successfully",
      metadata: await OrderService.getOrdersByUser({
        userId: req.body.userId,
      }),
    }).send(res);
  };

  getOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Get orders successfully",
      metadata: await OrderService.getOrderDetailByUser({
        userId: req.body.userId,
        orderId: req.query.orderId as string,
      }),
    }).send(res);
  };
}

export default new OrderController();
