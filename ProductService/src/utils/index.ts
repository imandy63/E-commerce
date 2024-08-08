import * as _ from "lodash";
import { Types } from "mongoose";

const convertToObjectIdMongoose = (id: string) => {
  return new Types.ObjectId(id);
};

const removeUndefinedObject = (obj: { [key: string]: any }) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] == null) {
      delete obj[key];
    }
  });
  return obj;
};

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};

const updateNestedObjectParser = (obj: { [key: string]: any }) => {
  const final: { [key: string]: string } = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      const response = updateNestedObjectParser(obj[key]);
      Object.keys(response).forEach((nestedKey) => {
        final[`${key}.${nestedKey}`] = response[nestedKey];
      });
    } else {
      final[key] = obj[key];
    }
  });
  return final;
};

const getUnSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 0]));
};

const isHex = (str: string) => {
  return /^[0-9A-Fa-f]+$/i.test(str);
};

export {
  getUnSelectData,
  getSelectData,
  convertToObjectIdMongoose,
  removeUndefinedObject,
  isHex,
  updateNestedObjectParser,
};
