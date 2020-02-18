import IResponse from '../utils/response';
import EventsService from "../services/EventsService";
import IEvent from "../model/followUpEvent/Interface";
import {Types} from "mongoose";
import ObjectId = Types.ObjectId;

export default class EventsController {
  static async create(event: IEvent): Promise<IResponse> {
    return EventsService.create(event);
  }

  static async getEmailNotificationTemplate(id: string): Promise<IResponse> {
    return EventsService.getEmailNotificationTemplate(new ObjectId(id));
  }

  static async remove(eventId: string): Promise<IResponse> {
    return EventsService.deactivate(eventId);
  }
};