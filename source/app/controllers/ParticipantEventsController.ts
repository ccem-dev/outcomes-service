import IResponse, {InternalServerErrorResponse, ValidationResponse} from '../utils/response';
import ParticipantEventsService from "../services/ParticipantEventsService";
import IParticipantEvent from "../model/participantEvent/Interface";
import {Types} from "mongoose";
import ObjectId = Types.ObjectId;
import {Request, Response} from "express";

export default class ParticipantEventsController {
  static start(req: Request, res: Response, participant: IParticipantEvent): void {
    ParticipantEventsService.start(participant)
      .then(result => {
        res.status(result.code).send(result.body);
      })
      .catch(err => {
        res.status(err.code).send(err.body)
      });
  }

  static cancelFollowUp(req: Request, res: Response): void {
    let id = req.params.id;
    validateObjectId(id);
    ParticipantEventsService.cancelFollowUp(id)
      .then(result => {
        res.status(result.code).send(result.body);
      })
      .catch(err => {
        res.status(err.code).send(err.body);
      });
  }

  static existEvent(req: Request, res: Response): void {
    let participant = req.params.participant;
    let eventId = req.params.event;

    validateObjectId(eventId);
    ParticipantEventsService.existEvent(participant, eventId)
      .then(result => {
        res.status(result.code).send(result.body);
      })
      .catch(err => {
        res.status(err.code).send(err.body)
      });
  }

  static accomplishedEvent(req: Request, res: Response): void {
    let id = req.params.id;
    validateObjectId(id);
    ParticipantEventsService.accomplishedEvent(new ObjectId(id))
      .then(result => {
        res.status(result.code).send(result.body);
      })
      .catch(err => {
        res.status(err.code).send(err.body)
      });
  }

  static discardEvent(req: Request, res: Response): void {
    let activityId = req.params.activityId;
    validateObjectId(activityId);
    ParticipantEventsService.discardEvent(new ObjectId(activityId))
      .then(result => {
        res.status(result.code).send(result.body);
      })
      .catch(err => {
        res.status(err.code).send(err.body)
      });
  }

  static listAll(req: Request, res: Response): void {
    let id = req.params.id;
    validateObjectId(id);
    ParticipantEventsService.listAll(new ObjectId(id))
      .then(result => {
        res.status(result.code).send(result.body);
      })
      .catch(err => {
        res.status(err.code).send(err.body)
      });
  }

};

function validateObjectId(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new ValidationResponse({message: "ObjectId is not valid"});
  }
}
