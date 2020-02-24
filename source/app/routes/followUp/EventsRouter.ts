import express, {Request, Response} from "express";
import EventsController from "../../controllers/EventsController";
import EventModel from "../../model/followUpEvent/model";

export default class EventsRouter {
  public static initialize(app: express.Application) {
    let basePath: string = "/event";
    let createPath: string = "/create";
    let notificationDataPath: string = "/notification-data";
    let removePath: string = "/remove";

    app.post(basePath + createPath + "/:followUpId", async (req: Request, res: Response) => {
      try {
        let event = new EventModel(req.body);
        event.set("followUpId", req.params.followUpId);
        let result =  await EventsController.create(event);
        res.status(result.code).send(result.body)
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });

    app.get(basePath + notificationDataPath + "/:eventId", async (req: Request, res: Response) => {
      try {
        let result =  await EventsController.getEmailNotificationTemplate(req.params.eventId);
        res.status(result.code).send(result.body)
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });

    app.put(basePath + removePath + "/:eventId", async (req: Request, res: Response) => {
      try {
        let result =  await EventsController.remove(req.params.eventId);
        res.status(result.code).send(result.body)
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });
  }
};