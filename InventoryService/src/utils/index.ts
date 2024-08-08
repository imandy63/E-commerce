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

const urlQueryConvert = (url: string, param: string) => {
  const urlWithoutSlash = url.endsWith("/") ? url.slice(0, -1) : url;

  // Construct the final URL
  const finalUrl = `${urlWithoutSlash}/${param}`;
  return finalUrl;
};

export {
  isHex,
  urlQueryConvert,
  getUnSelectData,
  getSelectData,
  convertToObjectIdMongoose,
};
