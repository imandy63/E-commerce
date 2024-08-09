export type CartProductsResponse = {
  cart_products: CartProductOrigin[];
  cart_count_product: number;
};

export type CartProductOrigin = {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  shopId: string;
};

export type OrderReview = {
  cartId: string;
  userId: string;
};

export type OrderCreate = {
  cartId: string;
  userId: string;
  user_address: {
    province: string;
    address: string;
  };
};

export type OrdersGet = { userId: string };
export type OrderInteraction = { userId: string; orderId: string };
export type OrderStatusUpdate = { orderId: string };
