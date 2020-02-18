import IResponse, {InternalServerErrorResponse, NotFoundResponse, SuccessResponse} from '../utils/response';
import {Types} from "mongoose";
import FollowUpEventModel from "../model/followUpEvent/model";
import IEvent from "../model/followUpEvent/Interface";
import ObjectId = Types.ObjectId;
import {EmailNotification} from "../model/utils/EmailNotification";

export default class FollowUpsService {
  static async create(event: IEvent): Promise<IResponse> {
    let order;
    let lastEventAddedOnFollowUp: IEvent = await FollowUpEventModel.findOne({"followUpId":event.followUpId}).sort({order:-1}).exec();

    try {
      if (lastEventAddedOnFollowUp) {
        order = lastEventAddedOnFollowUp.order + 1;
      } else {
        order = 0;
      }
      event.set("order",order);
      event.set("_id",new ObjectId);
      event.set('emailNotification', new EmailNotification(event.emailNotification));
      await event.save();
      return new SuccessResponse({ id: event._id });
    } catch (e) {
      throw new InternalServerErrorResponse(e);
    }
  }

  static async getEmailNotificationTemplate(id: ObjectId): Promise<IResponse> {
    let event: IEvent = await FollowUpEventModel.findOne({"_id": id});

    try {
      return new SuccessResponse(new EmailNotification(event.emailNotification).buildTemplate());
    } catch (e) {
      throw new InternalServerErrorResponse(e);
    }
  }

  static async deactivate(eventId: string): Promise<IResponse> {
    let updateResult;

    try {
      let query = FollowUpEventModel.where("_id", new ObjectId(eventId));
      updateResult = await query.update({"$set":{activated:false}});
    } catch (e) {
      throw new InternalServerErrorResponse();
    }

    if (updateResult) {
      return new SuccessResponse();
    } else {
      throw new NotFoundResponse({ message: "Event not found"})
    }
  }

};
