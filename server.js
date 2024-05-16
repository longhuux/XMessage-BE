const app = require("./app");

const { configDotenv } = require("dotenv");
configDotenv({ path: "./config.env" });

const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const http = require("http");

const server = http.createServer(app);

const DB = process.env.DBURI.replace("<password>", process.env.DBPASSWORD);

mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB connection is successful!");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
