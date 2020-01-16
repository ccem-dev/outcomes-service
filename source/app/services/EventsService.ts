import IResponse, {SuccessResponse, InternalServerErrorResponse, NotFoundResponse} from '../utils/responce';
import {Types} from "mongoose";
import FollowUpEventModel from "../model/followUpEvent/model";
import ObjectId = Types.ObjectId;
import IEvent from "../model/followUpEvent/Interface";
import IFollowUp from "../model/followUp/Interface";

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
      await event.save();
      return new SuccessResponse({ id: event._id });
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
