import IResponse from '../utils/response';
import EventsService from "../services/EventsService";
import IEvent from "../model/followUpEvent/Interface";
import ParticipantEventsService from "../services/ParticipantEventsService";
import IParticipantEvent from "../model/participantEvent/Interface";

export default class ParticipantEventsController {
  static async start(participant:IParticipantEvent): Promise<IResponse> {
    return ParticipantEventsService.start(participant);
  }

  static async existEvent(participant: string, eventId: string): Promise<IResponse> {
    return ParticipantEventsService.existEvent(participant, eventId);
  }

  static async cancelFollowUp(id: string): Promise<IResponse> {
    return ParticipantEventsService.cancelFollowUp(id);
  }

  static async accomplishedEvent(id: string): Promise<IResponse> {
    return ParticipantEventsService.accomplishedEvent(id);
  }
};