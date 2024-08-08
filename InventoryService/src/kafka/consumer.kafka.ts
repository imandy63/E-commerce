import { Kafka } from "kafkajs";
import { runConsumer } from "./service.kafka";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const KAFKA_CONNECTION_STATE = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
};

const groupId = process.env.KAFKA_GROUP_ID;

if (!groupId) {
  throw new Error("Kafka has no group id!");
}

const consumer = kafka.consumer({ groupId });

const connectToKafka = async () => {
  await consumer.connect();

  consumer.on("consumer.connect", () => {
    console.log("Kafka status::", KAFKA_CONNECTION_STATE.CONNECT);
  });

  consumer.on("consumer.disconnect", () => {
    console.log("Kafka status::", KAFKA_CONNECTION_STATE.DISCONNECT);
  });
};

const disconnectKafka = async () => {
  await consumer.disconnect();
};

const runKafkaService = async () => {
  await runConsumer(consumer);
};

export { connectToKafka, disconnectKafka, runKafkaService };
