import { IKeyStore } from "../models/keyToken.model";
import { IPayload } from "./auth";
import { Request } from "express";

export type ClassType<T = any> = new (...args: any[]) => T;
export type StringObj = { [key: string]: string };
export type StringNumObj = { [key: string]: string | number };
export type NumObj = { [key: string]: number };
export type Obj = { [key: string]: any };

export interface CustomRequest extends Request {
  refreshToken: string;
  user: IPayload;
  keyStore: IKeyStore;
}
