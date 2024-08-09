import { Types } from "mongoose";

export const convertToObjectIdMongoose = (id: string) => {
  return new Types.ObjectId(id);
};
