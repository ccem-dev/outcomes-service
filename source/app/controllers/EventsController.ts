import IResponse from '../utils/response';
import EventsService from "../services/EventsService";
import IEvent from "../model/followUpEvent/Interface";

export default class EventsController {
  static async create(event: IEvent): Promise<IResponse> {
    return EventsService.create(event);
  }

  static async remove(eventId: string): Promise<IResponse> {
    return EventsService.deactivate(eventId);
  }
};