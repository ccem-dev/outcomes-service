import app from "./app";
const mongoose = require("mongoose");
const listEndpoints = require('express-list-endpoints');

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
  keepAlive: 1,
  useCreateIndex: true,
  auth: {
    user: app.get("DATABASE_USER"),
    password: app.get("DATABASE_PASS")
  }
};

const url = `mongodb://${app.get("DATABASE_HOSTNAME")}:${app.get("DATABASE_PORT")}/${app.get("DATABASE")}?authSource=${app.get("DATABASE")}`;

connect();

function listen() {
  app.listen(app.get("API_PORT"), () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      app.get("API_PORT"),
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });
  endpointsList();
}

function connect() {
  console.log("connecting to: " + url);
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);
  mongoose.connect(url, options);
}

function endpointsList() {
  let endpoints = listEndpoints(app);
  console.table(endpoints)
}
