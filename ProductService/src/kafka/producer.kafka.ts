import { Kafka } from "kafkajs";
import { StockInventoryAdd } from "../interfaces/inventory";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const KAFKA_CONNECTION_STATE = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  TIMEOUT: "time_out",
};

const producer = kafka.producer();

const connectToKafka = async () => {
  await producer.connect();

  producer.on("producer.connect", () => {
    console.log("Kafka status::", KAFKA_CONNECTION_STATE.CONNECT);
  });

  producer.on("producer.network.request_timeout", () => {
    console.log("Kafka status::", KAFKA_CONNECTION_STATE.TIMEOUT);
  });

  producer.on("producer.disconnect", () => {
    console.log("Kafka status::", KAFKA_CONNECTION_STATE.DISCONNECT);
  });
};

const sendMessage = async (
  topic: string,
  eventName: string,
  msg: StockInventoryAdd
) => {
  try {
    await producer.send({
      topic,
      messages: [
        {
          key: eventName,
          value: JSON.stringify(msg),
        },
      ],
    });
    console.log(`Send message success: ${JSON.stringify(msg)}`);
  } catch (error) {
    console.error(`Send message kafka error ${error}`);
  }
};

const disconnectKafka = async () => {
  await producer.disconnect();
};

export { connectToKafka, sendMessage, disconnectKafka };
