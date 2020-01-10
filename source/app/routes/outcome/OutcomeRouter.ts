import {Response, Request} from "express";
import express from "express";
import OutcomesController from "../../controllers/OutcomesController";

export default class OutcomesRouter {
  public static initialize(app: express.Application) {
    let basePath: string = "/outcomes";
    app.post(basePath, async (req: Request, res: Response) => {
      try {
        let result =  await OutcomesController.save();
        res.status(result.code).send(result.body)
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });
  }
};