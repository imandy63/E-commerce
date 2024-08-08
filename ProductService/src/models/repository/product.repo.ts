"use strict";

import { Obj, StringObj } from "../../interfaces";
import { product, UserInputProduct } from "../product.model";
import {
  getSelectData,
  getUnSelectData,
  convertToObjectIdMongoose,
} from "../../utils/index";

import { SortOrder, Types } from "mongoose";

const publishProductByShop = async ({
  product_shop,
  product_id,
}: StringObj) => {
  const foundShop = await product.findOne({
    product_shop: new Types.ObjectId(product_shop),
    _id: product_id,
  });

  if (!foundShop) {
    return null;
  }

  foundShop.isDraft = false;
  foundShop.isPublished = true;

  const { modifiedCount } = await foundShop.updateOne(foundShop);
  return modifiedCount;
};

const unpublishProductByShop = async ({
  product_shop,
  product_id,
}: StringObj) => {
  const foundShop = await product.findOne({
    product_shop: new Types.ObjectId(product_shop),
    _id: product_id,
  });

  if (!foundShop) {
    return null;
  }

  foundShop.isDraft = true;
  foundShop.isPublished = false;

  const { modifiedCount } = await foundShop.updateOne(foundShop);
  return modifiedCount;
};

const queryProduct = async ({
  query,
  limit,
  skip,
}: {
  query: Obj;
  limit: number;
  skip: number;
}) => {
  return await product
    .find(query)
    .populate("product_shop", "name email -_id")
    .sort({ updateAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
};

const searchProductByUser = async ({ keySearch }: StringObj) => {
  const regexSearch = new RegExp(keySearch);
  const results = await product
    .find(
      {
        $text: {
          $search: regexSearch.toString(),
        },
      },
      {
        score: {
          $meta: "textScore",
        },
      }
    )
    .sort({
      score: {
        $meta: "textScore",
      },
    })
    .lean();

  return results;
};

const findAllProducts = async ({ limit, sort, page, filter, select }: Obj) => {
  const skip = limit * (page - 1);
  const sortBy: string | { [key: string]: SortOrder } =
    sort == "ctime" ? { _id: -1 } : { _id: 1 };
  const products = await product
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean();

  return products;
};

const findProduct = async ({ product_id, unSelect }: Obj) => {
  return await product
    .findById(convertToObjectIdMongoose(product_id))
    .select(getUnSelectData(unSelect));
};

const updateProductById = async ({
  productId,
  bodyUpdate,
  model,
  isNew = true,
}: Obj) => {
  return await model.findByIdAndUpdate(productId, bodyUpdate, { new: isNew });
};

const findProductById = async (productId: string) => {
  return await product
    .findOne({ _id: convertToObjectIdMongoose(productId) })
    .lean();
};

const checkProductByServer = async (products: UserInputProduct[]) => {
  return await Promise.all(
    products.map(async (prdct) => {
      const foundProduct = await findProductById(prdct.productId);

      if (foundProduct) {
        return {
          price: foundProduct.product_price,
          quantity: prdct.quantity,
          productId: prdct.productId,
        };
      }
    })
  );
};

export {
  findProductById,
  updateProductById,
  publishProductByShop,
  unpublishProductByShop,
  queryProduct,
  searchProductByUser,
  findAllProducts,
  findProduct,
  checkProductByServer,
};
