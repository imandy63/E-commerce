import dotenv from "dotenv";
dotenv.config();

const port = process.env.REDIS_PORT;
if (!port) {
  console.log(port);
  throw new Error("Redis port is missing!");
}

export const RedisConfig = {
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(port),
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
};
