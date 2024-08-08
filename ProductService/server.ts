import app from "./src/index";

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server down");
  });

  //   notify.send()
});
