import { ExecException } from "child_process";
import mongoose from "mongoose";

const connectionString = "mongodb://localhost:27017/admin";

class MongooseDB {
  static instance: MongooseDB;
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", false);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectionString, {
        maxPoolSize: 50,
      })
      .then(() => console.log("Successfully"))
      .catch((err: ExecException) => {
        console.log("Error:" + err);
      });
  }

  static getInstance() {
    if (!MongooseDB.instance) {
      MongooseDB.instance = new MongooseDB();
    }
    return MongooseDB.instance;
  }
}

export const MongoConnection = MongooseDB.getInstance();
