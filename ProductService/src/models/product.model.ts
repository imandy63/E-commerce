import { model, Schema, InferSchemaType } from "mongoose";
import slugify from "slugify";

const DOCUMENT_NAME = "Products";
const COLLECTION_NAME = "Product";

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_thumb: {
      type: String,
      required: true,
    },
    product_description: String,
    product_slug: String,
    product_price: {
      type: Number,
      required: true,
    },
    product_quantity: {
      type: Number,
      required: true,
    },
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    product_attributes: {
      type: Schema.Types.Mixed,
      required: true,
    },
    //more
    product_ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must above 1.0"],
      max: [5, "Rating must below 5.0"],
      //
      set: (val: number) => {
        Math.round(val * 10) / 10;
      },
    },
    product_variation: {
      type: Array,
      default: [],
    },
    isDraft: {
      type: Boolean,
      default: true,
      index: true,
      select: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
      select: false,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "modified_at",
    },
  }
);

const clothingSchema = new Schema(
  {
    brand: {
      type: String,
      require: true,
    },
    size: String,
    material: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  {
    collection: "clothes",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "modified_at",
    },
  }
);

const electronicSchema = new Schema(
  {
    brand: {
      type: String,
      require: true,
    },
    model: String,
    color: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  {
    collection: "electronics",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "modified_at",
    },
  }
);

// create index
productSchema.index({
  product_name: "text",
  product_description: "text",
});

// middleware before .create() and .save()
productSchema.pre("save", function (next) {
  if (this.product_name) {
    this.product_slug = slugify(this.product_name, { lower: true });
    next();
  }
});

// Types

const furnitureSchema = new Schema(
  {
    brand: {
      type: String,
      require: true,
    },
    size: String,
    color: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  {
    collection: "furnitures",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "modified_at",
    },
  }
);

export const product = model(DOCUMENT_NAME, productSchema);
export const electronic = model("Electronics", electronicSchema);
export const clothing = model("Clothes", clothingSchema);
export const furniture = model("Furnitures", furnitureSchema);

export type Product = InferSchemaType<typeof productSchema>;

export interface IProductWithType extends Product {
  product_type: string;
}

export type UserInputProduct = {
  productId: string;
  quantity: number;
};
