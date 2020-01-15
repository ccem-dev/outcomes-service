import {Response, Request} from "express";
import express from "express";
import FollowUpsController from "../../controllers/FollowUpsController";
import FollowUpModel from "../../model/followUp/model"

export default class FollowUpsRouter {
  public static initialize(app: express.Application) {
    let basePath: string = "/followUp";
    let addPath: string = "/add";
    let updatePath: string = "/update";
    let deactivatePath: string = "/deactivate";
    let listPath: string = "/list";

    app.post(basePath + addPath, async (req: Request, res: Response) => {
      try {
        let newFollowUp = new FollowUpModel(req.body);
        let result =  await FollowUpsController.add(newFollowUp);
        res.status(result.code).send(result.body)
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });

    app.put(basePath + updatePath, async (req: Request, res: Response) => {
      try {
        let followUp = new FollowUpModel(req.body);
        let result =  await FollowUpsController.update(followUp);
        res.status(result.code).send(result.body)
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });

    app.put(basePath + deactivatePath + "/:followUpId", async (req: Request, res: Response) => {
      try {
        let result =  await FollowUpsController.deactivate(req.params.followUpId);
        res.status(result.code).send(result.body)
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });

    app.get(basePath + listPath, async (req: Request, res: Response) => {
      try {
        let result =  await FollowUpsController.list();
        res.status(result.code).send(result.body)
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });
  }
};