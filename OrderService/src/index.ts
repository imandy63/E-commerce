import compression from "compression";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { Obj } from "./interfaces";
import * as dotenv from "dotenv";
import { router } from "./route";
import { MongooseDB } from "./dbs/init.mongoose";
import { redisInstance } from "./dbs/init.redis";
dotenv.config();

redisInstance.initRedis();
MongooseDB.getInstance();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

app.use("", router);

app.use((req, res, next) => {
  const error: Obj = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error: Obj, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status ?? 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

export { app };
