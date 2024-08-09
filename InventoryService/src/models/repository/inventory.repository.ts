import { convertToObjectIdMongoose } from "../../utils";
import { inventory } from "../inventory.model";

type ReserveInventoryType = {
  productId: string;
  quantity: number;
  cartId: string;
};

export const reserveInventory = async ({
  productId,
  quantity,
  cartId,
}: ReserveInventoryType) => {
  console.log(
    await inventory.findOne({
      inven_productId: convertToObjectIdMongoose(productId),
      inven_stock: { $gte: quantity },
    })
  );
  const query = {
      inven_productId: convertToObjectIdMongoose(productId),
      inven_stock: { $gte: quantity },
    },
    update_set = {
      $inc: { inven_quantity: -quantity },
      $push: {
        reservation: {
          quantity,
          cartId,
          createdOn: new Date(),
        },
      },
    },
    options = { upsert: true, new: true };

  return await inventory.updateOne(query, update_set, options);
};
