import IResponse, {SuccessResponse, InternalServerErrorResponse, NotFoundResponse} from '../utils/responce';
import {Types} from "mongoose";
import FollowUpModel from "../model/followUp/model";
import ObjectId = Types.ObjectId;
import IEvent from "../model/followUpEvent/Interface";
import IFollowUp from "../model/followUp/Interface";

export default class FollowUpsService {
  static async create(event: IEvent): Promise<IResponse> {
    let order;
    let lastEventAddedOnFollowUp: IFollowUp = await FollowUpModel.findOne({"followUpId":event.followUpId}).sort({order:-1}).exec();

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
    let eventOid;
    let updateResult;

    try {
      eventOid = new ObjectId(eventId);
      let query = FollowUpModel.where("_id", eventOid);
      updateResult = await query.update({"$set":{deactivated:false}});
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
