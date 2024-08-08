import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { Obj } from "./interfaces";
import { errorHandler } from "./helper/errorMiddleware";
import router from "./router";
import { MongoConnection } from "./dbs/init.mongoose";
import * as dotenv from "dotenv";
dotenv.config();
MongoConnection;

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

app.use(errorHandler);

export default app;
