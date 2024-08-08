import { NextFunction, Response, Request } from "express";
import { CREATED, SuccessResponse } from "../core/success.response";
import { ProductFactory as ProductService } from "../services/product.service";

class ProductController {
  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    new CREATED({
      message: "Create new Product successfully!",
      metadata: await ProductService.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.body.userId,
      }),
    }).send(res);
  };

  publishProduct = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Publish Product successfully!",
      metadata: await ProductService.publishProductByShop({
        product_shop: req.body.userId,
        product_id: req.params.id,
      }),
    }).send(res);
  };

  unpublishProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Unpublished Product successfully!",
      metadata: await ProductService.unpublishProductByShop({
        product_shop: req.body.userId,
        product_id: req.params.id,
      }),
    }).send(res);
  };

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    new SuccessResponse({
      message: "Update Product successfully!",
      metadata: await ProductService.updateProduct(
        req.body.product_type,
        req.params.productId,
        {
          ...req.body,
          product_shop: req.body.userId,
        }
      ),
    }).send(res);
  }

  getAllDraftsForShop = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get draft list successfully!",
      metadata: await ProductService.findAllDraftForShop({
        product_shop: req.body.userId,
      }),
    }).send(res);
  };

  getAllPublishedForShop = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get published product list successfully!",
      metadata: await ProductService.findAllPublishedForShop({
        product_shop: req.body.userId,
      }),
    }).send(res);
  };

  getListSearchProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get search list successfully!",
      metadata: await ProductService.searchProduct({
        keySearch: req.params.keySearch,
      }),
    }).send(res);
  };

  findAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Get all products successfully!",
      metadata: await ProductService.findAllProducts(req.query),
    }).send(res);
  };

  findProduct = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Get product successfully!",
      metadata: await ProductService.findProduct({
        product_id: req.params.product_id,
      }),
    }).send(res);
  };

  // END QUERY
}

export const Controller = new ProductController();
