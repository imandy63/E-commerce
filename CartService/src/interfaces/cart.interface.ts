export type CartProduct = {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  shopId: string;
};

type CartUpdateProduct = {
  productId: string;
  quantity: number;
  old_quantity: number;
};

type CartShopProductUpdate = {
  shopId: string;
  item_product: CartUpdateProduct;
};

type CartProductUpdateQuantity = {
  productId: string;
  quantity: number;
};

export type CartUpdateQuantity = {
  userId: string;
  product: CartProductUpdateQuantity;
};
export type CartCreate = { userId: string; product: CartProduct };
export type CartUpdate = {
  userId: string;
  shop_order: CartShopProductUpdate;
};
export type CartDeleteProduct = { userId: string; productId: string };
export type CartGet = { userId: string };
