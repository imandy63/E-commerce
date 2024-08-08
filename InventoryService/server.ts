import app from "./src/index";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Inventory service started on port ${port}`);
});

process.on("SIGINT", () => {});
