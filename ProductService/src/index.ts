import express, { NextFunction, Request, Response } from "express";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import router from "./routes/index";
import { MongooseDB } from "./dbs/init.mongoose";
import { redisInstance } from "./dbs/init.redis";
import { connectToKafka } from "./kafka/producer.kafka";
import { Obj } from "./interfaces";
import { startGRPCProductService } from "./grpc/product.server.grpc";
dotenv.config();
MongooseDB.getInstance();
startGRPCProductService();
//redisInstance.initRedis();
//connectToKafka();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

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

export default app;
