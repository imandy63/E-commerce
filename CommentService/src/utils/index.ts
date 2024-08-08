import * as _ from "lodash";
import { Types } from "mongoose";

const convertToObjectIdMongoose = (id: string) => {
  return new Types.ObjectId(id);
};

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};

const getUnSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 0]));
};

const isHex = (str: string) => {
  return /^[0-9A-Fa-f]+$/i.test(str);
};

export { getUnSelectData, getSelectData, convertToObjectIdMongoose, isHex };
