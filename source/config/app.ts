import express from "express";
import bodyParser from "body-parser";
import RouterInitializer from "../app/routes/initializer";

let app: express.Application;

app = express();

app.set("DATABASE_USER", process.env.DATABASE_USER);
app.set("DATABASE_PASS", process.env.DATABASE_PASS);
app.set("DATABASE_HOSTNAME", process.env.DATABASE_HOSTNAME);
app.set("DATABASE_PORT", process.env.DATABASE_PORT);
app.set("DATABASE", process.env.DATABASE);
app.set("API_PORT", process.env.API_PORT);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

RouterInitializer.initialize(app);

export default app;