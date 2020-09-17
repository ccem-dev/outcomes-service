import express, {Request, Response} from "express";
import ParticipantEventModel from "../../model/participantEvent/model"
import ParticipantEventsController from "../../controllers/ParticipantEventsController";
import {ObjectTypeService} from "../../services/ObjectTypeService";


export default class ParticipantEventsRouter {
  public static initialize(app: express.Application) {
    let basePath: string = "/participantEvent";
    let startPath: string = "/start";
    let searchPath: string = "/search";
    let cancelPath: string = "/cancel";
    let listPath: string = "/listAll";
    let accomplishedPath: string = "/accomplished";
    let accomplishedByActivityIdPath: string = "/accomplished/activity";
    let discardActivityPath: string = "/discarded/activity";

    app.post(basePath + startPath + '/:participant', async (req: Request, res: Response) => {
      let json: any;
      try {
        json = ObjectTypeService.validateBody(req.body, req.params.participant);

        let event = new ParticipantEventModel(json);
        ParticipantEventsController.start(req, res, event);
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });

    app.put(basePath + cancelPath + "/:id", async (req: Request, res: Response) => {
      try {
        ParticipantEventsController.cancelFollowUp(req, res);
      } catch (err) {
        res.status(err.code).send(err.body);
      }
    });

    app.get(basePath + '/:participant' + searchPath + '/:event', async (req: Request, res: Response) => {
      try {
        ParticipantEventsController.existEvent(req, res);
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });

    app.put(basePath + accomplishedPath + "/:id", async (req: Request, res: Response) => {
      try {
        ParticipantEventsController.accomplishedEvent(req, res);
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });

    app.put(basePath + accomplishedByActivityIdPath + "/:activityId", async (req: Request, res: Response) => {
      try {
        ParticipantEventsController.accomplishedEventByActivityId(req, res);

      } catch (err) {
      }
    })

    app.put(basePath + discardActivityPath + "/:activityId", async (req: Request, res: Response) => {
      try {
        ParticipantEventsController.discardEvent(req, res);
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });

    app.get(basePath + listPath + '/:id', async (req: Request, res: Response) => {
      try {
        ParticipantEventsController.listAll(req, res);
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });

  }
};
