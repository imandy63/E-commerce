import { Consumer } from "kafkajs";
import * as dotenv from "dotenv";
import { StockInventoryAdd } from "../models/inventory.model";
import { InventoryService } from "../services/inventory.service";
dotenv.config();
const kafkaTopic = process.env.KAFKA_ADD_TO_INVENTORY_STOCK_TOPIC;

if (!kafkaTopic) {
  throw new Error("Topic is not provided");
}

export const runConsumer = async (consumer: Consumer) => {
  await consumer.connect();
  await consumer.subscribe({ topic: kafkaTopic, fromBeginning: false });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value) {
        const value = JSON.parse(message.value.toString()) as StockInventoryAdd;
        InventoryService.addStockToInventory(value);
        console.log("Received");
      }
    },
  });
};
