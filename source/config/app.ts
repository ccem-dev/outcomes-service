import express from "express";
import bodyParser from "body-parser";
import RouterInitializer from "../app/routes/initializer";

let app: express.Application;

app = express();

app.set("DATABASE_USER", process.env.DATABASE_USER || "user");
app.set("DATABASE_PASS", process.env.DATABASE_PASS || "user");
app.set("DATABASE_HOSTNAME", process.env.DATABASE_HOSTNAME || "localhost");
app.set("DATABASE_PORT", process.env.DATABASE_PORT || 27017);
app.set("DATABASE", process.env.DATABASE || "otus-survey");
app.set("API_PORT", process.env.API_PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

RouterInitializer.initialize(app);

export default app;