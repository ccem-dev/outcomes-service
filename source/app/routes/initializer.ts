import express from "express";
import OutcomeRouter from "./outcome/OutcomeRouter";

export default class RouterInitializer{
  public static initialize(app: express.Application){
    app.all('*', function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header('Content-Type', 'application/json');
      next();
    });

    OutcomeRouter.initialize(app);
  }
}
