import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { MongoConnection } from "./dbs/mongoose.init";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import { Obj } from "./interfaces";
import Router from "./route";
import { startGRPCCartServer } from "./grpc/cart.server.grpc";
import { redisInstance } from "./dbs/init.redis";
dotenv.config();
redisInstance.initRedis();
MongoConnection();
startGRPCCartServer();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

app.use("", Router);

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
