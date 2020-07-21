import IResponse, { ValidationResponse } from '../utils/response';
import ParticipantEventsService from "../services/ParticipantEventsService";
import IParticipantEvent from "../model/participantEvent/Interface";
import { Types } from "mongoose";
import ObjectId = Types.ObjectId;

export default class ParticipantEventsController {
  static async start(participant: IParticipantEvent): Promise<IResponse> {
    return ParticipantEventsService.start(participant);
  }

  static async existEvent(participant: string, eventId: string): Promise<IResponse> {
    validObjectId(eventId);
    return ParticipantEventsService.existEvent(participant, eventId);
  }

  static async cancelFollowUp(id: string): Promise<IResponse> {
    validObjectId(id);
    return ParticipantEventsService.cancelFollowUp(id);
  }

  static async accomplishedEvent(id: string): Promise<IResponse> {
    validObjectId(id);
    return ParticipantEventsService.accomplishedEvent(new ObjectId(id));
  }

  static async discardEvent(activityId: string): Promise<IResponse> {
    validObjectId(activityId);
    return ParticipantEventsService.discardEvent(new ObjectId(activityId));
  }

  static async listAll(id: string): Promise<IResponse> {
    validObjectId(id);
    return ParticipantEventsService.listAll(new ObjectId(id));
  }

};

function validObjectId(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new ValidationResponse({ message: "ObjectId is not valid" });
  }
}
