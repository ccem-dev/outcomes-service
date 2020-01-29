import express, {Request, Response} from "express";
import ParticipantEventModel from "../../model/participantEvent/model"
import ParticipantEventsController from "../../controllers/ParticipantEventsController";


export default class ParticipantEventsRouter {
  public static initialize(app: express.Application) {
    let basePath: string = "/participantEvent";
    let startPath: string = "/start";
    let searchPath: string = "/search";
    let cancelPath: string = "/cancel";
    let listPath: string = "/listAll";
    let accomplishedPath: string = "/accomplished";

    app.post(basePath + startPath + '/:participant', async (req: Request, res: Response) => {
      let json: any;
      json = validateBody(req.body, req.params.participant);
      try {
        let event = new ParticipantEventModel(json);
        let result = await ParticipantEventsController.start(event);
        res.status(result.code).send(result.body);
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });

    app.put(basePath + cancelPath + "/:id", async (req: Request, res: Response) => {
      try {
        let result = await ParticipantEventsController.cancelFollowUp(req.params.id);
        res.status(result.code).send(result.body);
      } catch (err) {
        res.status(err.code).send(err.body);
      }
    });

    app.get(basePath + '/:participant' + searchPath + '/:event', async (req: Request, res: Response) => {
      try {
        let result = await ParticipantEventsController.existEvent(req.params.participant, req.params.event);
        res.status(result.code).send(result.body);
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });

    app.put(basePath + accomplishedPath + "/:id", async (req: Request, res: Response) => {
      try {
        let result = await ParticipantEventsController.accomplishedEvent(req.params.id);
        res.status(result.code).send(result.body);
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });

    app.get(basePath + listPath + '/:id', async (req: Request, res: Response) => {
      try {
        let result = await ParticipantEventsController.listAll(req.params.id);
        res.status(result.code).send(result.body);
      } catch (err) {
        res.status(err.code).send(err.body)
      }
    });


    function validateObjectType(type: string) {
      let participantType = new RegExp(/^Participant/);

      if (participantType.test(type)) {
        return type;
      } else {
        return "Participant".concat(type);
      }
    }

    function validateBody(body: any, participant: string) {
      let json: any = {
        objectType: validateObjectType(body.objectType),
          eventId: body._id,
        participant: participant,
      };

      if (body.hasOwnProperty("activityId")) {
        json.activityId = body.activityId;
      }
    }
  }
};