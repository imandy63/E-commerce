import compression from "compression";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { connectToKafka, runKafkaService } from "./kafka/consumer.kafka";
import { Obj } from "./interfaces";
import router from "./routes";
import { MongooseDB } from "./dbs/init.mongoose";
import { startGRPCInventoryService } from "./grpc/inventory.server";
dotenv.config();
MongooseDB.getInstance();
startGRPCInventoryService();
//connectToKafka();
//runKafkaService();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
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

export default app;
