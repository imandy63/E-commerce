import * as redis from "redis";
import { RedisConfig } from "../config/config.redis";

type RedisClient = ReturnType<typeof redis.createClient>;

class Redis {
  private client: { instanceConnect?: RedisClient } = {};
  private connectionStatus = {
    CONNECT: "connect",
    END: "end",
    RECONNECT: "reconnecting",
    ERROR: "error",
  };

  handleEventConnect = (redisConnection: RedisClient) => {
    redisConnection.on(this.connectionStatus.CONNECT, () => {
      console.log("Connection status::Connected");
    });

    redisConnection.on(this.connectionStatus.END, () => {
      console.log("Connection status::End");
    });

    redisConnection.on(this.connectionStatus.RECONNECT, () => {
      console.log("Connection status::Reconnect");
    });

    redisConnection.on(this.connectionStatus.ERROR, (err: Error) => {
      console.log("Connection status::Error:", err);
    });
  };

  initRedis = () => {
    const instanceRedis = redis.createClient(RedisConfig);

    this.client.instanceConnect = instanceRedis;
    this.handleEventConnect(instanceRedis);
    instanceRedis.connect();
  };

  getRedis = () => {
    if (this.client.instanceConnect) {
      return this.client.instanceConnect;
    }
  };

  closeRedis = () => {
    this.client.instanceConnect?.disconnect();
  };
}

const redisInstance = new Redis();

export { redisInstance };
