import { app } from "./src";

const port = process.env.PORT;

if (!port) {
  throw new Error("Port is missing");
}

const server = app.listen(port, () => {
  console.log(`Cart service is listened on port ${port}`);
});

process.on("SIGINT", () => {
  console.log("Server down");
});
