import {
  product,
  clothing,
  electronic,
  furniture,
  IProductWithType,
} from "../models/product.model";
import {
  isHex,
  removeUndefinedObject,
  updateNestedObjectParser,
} from "../utils/index";
import { ClassType, StringNumObj, StringObj } from "../interfaces";
import {
  updateProductById,
  publishProductByShop,
  queryProduct,
  unpublishProductByShop,
  searchProductByUser,
  findAllProducts,
  findProduct,
} from "../models/repository/product.repo";
import { BadRequestError, ForbiddenError } from "../core/error.response";
import { sendMessage } from "../kafka/producer.kafka";
import * as dotenv from "dotenv";
import { addIntoInventory } from "../grpc/inventory.grpc";
dotenv.config();
const kafkaTopic = process.env.KAFKA_ADD_TO_INVENTORY_STOCK_TOPIC;

interface ProductFindForShop {
  product_shop: string;
  limit?: number;
  skip?: number;
}

class ProductFactory {
  /*
    
    */
  static productRegistry: { [key: string]: ClassType } = {};

  static registerProductType(type: string, classRef: ClassType) {
    ProductFactory.productRegistry[type] = classRef;
  }

  static async createProduct(type: string, payload: Product) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) {
      throw new BadRequestError("Invalid product type!");
    }

    return new productClass(payload).createProduct();
  }

  // Querying
  static async publishProductByShop({ product_shop, product_id }: StringObj) {
    return await publishProductByShop({ product_shop, product_id });
  }

  static async unpublishProductByShop({ product_shop, product_id }: StringObj) {
    return await unpublishProductByShop({ product_shop, product_id });
  }

  static async updateProduct(
    type: string,
    productId: string,
    payload: Product
  ) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) {
      throw new BadRequestError(`Invalid type name ${type}`);
    }
    return new productClass(payload).updateProduct(productId);
  }

  static async findAllDraftForShop({
    product_shop,
    limit = 10,
    skip = 0,
  }: ProductFindForShop) {
    const query = { product_shop, isDraft: true };
    return await queryProduct({ query, limit, skip });
  }

  static async findAllPublishedForShop({
    product_shop,
    limit = 10,
    skip = 0,
  }: ProductFindForShop) {
    const query = { product_shop, isPublished: true };
    return await queryProduct({ query, limit, skip });
  }

  static async searchProduct({ keySearch }: StringObj) {
    return await searchProductByUser({ keySearch });
  }

  static async findAllProducts({
    limit = 50,
    sort = "ctime",
    page = 1,
    filter = { isPublished: true },
  }) {
    return await findAllProducts({
      limit,
      filter,
      sort,
      page,
      select: ["product_name", "product_price", "product_thumb"],
    });
  }

  static async findProduct({ product_id }: StringObj) {
    if (!isHex(product_id) || product_id.length != 24) {
      throw new BadRequestError(
        "Product id needs to be in hex and has 24 characters"
      );
    }
    return await findProduct({ product_id, unSelect: ["__v"] });
  }
}

// Base Product
class Product {
  product_name: string | null | undefined;
  product_thumb: string | null | undefined;
  product_description: string | null | undefined;
  product_price: number | null | undefined;
  product_quantity: number | null | undefined;
  product_type: string;
  product_shop: import("mongoose").Types.ObjectId | null | undefined;
  product_attributes: any;
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }: IProductWithType) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }

  async createProduct(product_id: string) {
    const newProduct = await product.create({ ...this, _id: product_id });
    // if (!kafkaTopic) {
    //   throw new Error("Kafka topic for this action is not provided!");
    // }
    console.log("Added new Product");
    if (newProduct) {
      try {
        const { success } = await addIntoInventory({
          productId: newProduct._id.toString(),
          stock: newProduct.product_quantity,
          shopId: newProduct.product_shop.toString(),
        });
        if (!success) {
          await newProduct.deleteOne();
        }
      } catch (err) {
        await newProduct.deleteOne();
      }

      // await sendMessage(kafkaTopic, "insertProduct", {
      //   productId: newProduct._id as Types.ObjectId,
      //   stock: this.product_quantity as number,
      //   shopId: this.product_shop as Types.ObjectId,
      // });
    }
    /**
     * Kafka for calling service
     */
    return newProduct;
  }

  async updateProduct(productId: string, bodyUpdate: StringNumObj) {
    return await updateProductById({
      productId,
      bodyUpdate,
      model: product,
    });
  }
}

// Type Clothing

class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newClothing) {
      throw new BadRequestError("Cannot create new clothing!");
    }

    const newProduct = await super.createProduct(newClothing._id.toString());
    if (!newProduct) {
      throw new BadRequestError("Cannot create new product!");
    }

    return newProduct;
  }

  async updateProduct(productId: string) {
    // remove null/undefined
    const objectParams = removeUndefinedObject(this);
    console.log(objectParams);
    if (objectParams.product_attributes) {
      await updateProductById({
        productId,
        bodyUpdate: removeUndefinedObject(objectParams.product_attributes),
        model: clothing,
      });
    }

    const updateProduct = super.updateProduct(productId, objectParams);
    return updateProduct;
  }
}

// Type Electronics

class Electronics extends Product {
  async createProduct() {
    const newElectronic = await electronic.create(this.product_attributes);
    if (!newElectronic) {
      throw new BadRequestError("Cannot create new electronics!");
    }

    const newProduct = await super.createProduct(newElectronic._id.toString());
    if (!newProduct) {
      throw new BadRequestError("Cannot create new product!");
    }

    return newProduct;
  }

  async updateProduct(productId: string) {
    // remove null/undefined
    const objectParams = removeUndefinedObject(this);
    if (objectParams.product_attributes) {
      await updateProductById({
        productId,
        bodyUpdate: updateNestedObjectParser(objectParams.product_attributes),
        model: electronic,
      });
    }

    const updateProduct = super.updateProduct(
      productId,
      updateNestedObjectParser(objectParams)
    );
    return updateProduct;
  }
}

// Type Furnitures
class Furnitures extends Product {
  async createProduct() {
    const newFurniture = await furniture.create(this.product_attributes);
    if (!newFurniture) {
      throw new BadRequestError("Cannot create new electronics!");
    }

    const newProduct = await super.createProduct(newFurniture._id.toString());
    if (!newProduct) {
      throw new BadRequestError("Cannot create new product!");
    }

    return newProduct;
  }
}

ProductFactory.registerProductType("Clothing", Clothing);
ProductFactory.registerProductType("Electronic", Electronics);
ProductFactory.registerProductType("Furniture", Furnitures);

export { ProductFactory };
