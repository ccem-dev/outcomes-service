import IResponse, {SuccessResponse, InternalServerErrorResponse, NotFoundResponse} from '../utils/responce';
import IFollowUp from "../model/followUp/Interface";
import {Types} from "mongoose";
import FollowUpModel from "../model/followUp/model";
import FollowUpEventModel from "../model/followUpEvent/model.js";
import ObjectId = Types.ObjectId;


export default class FollowUpsService {
  static async save(followUp: IFollowUp): Promise<IResponse> {
    let order;
    let lastFollowUpAdded: IFollowUp = await FollowUpModel.findOne().sort({order:-1}).exec();
    try {
      if (lastFollowUpAdded) {
        order = lastFollowUpAdded.order + 1;
      } else {
        order = 0;
      }
      followUp.set("order",order);
      await followUp.save();
      return new SuccessResponse({id:followUp._id});
    } catch (e) {
      throw new InternalServerErrorResponse(e);
    }
  }

  static async update(followUp: IFollowUp): Promise<IResponse> {
    let updateResult;

    try {
      updateResult = await FollowUpModel.updateOne({"_id": followUp._id}, followUp);
    } catch (e) {
      throw new InternalServerErrorResponse(e);
    }

    if (updateResult.n) {
      return new SuccessResponse();
    } else {
      throw new NotFoundResponse({message: "FollowUp not found"})
    }
  }

  static async deactivate(followUpId: string): Promise<IResponse> {
    let updateResult;

    try {
      updateResult = await FollowUpModel.updateOne({"_id": new ObjectId(followUpId)}, {"$set": {activated: false}});
    } catch (e) {
      throw new InternalServerErrorResponse();
    }

    if (updateResult) {
      return new SuccessResponse();
    } else {
      throw new NotFoundResponse({message: "FollowUp not found"})
    }
  }

  static async list(): Promise<IResponse> {
    let activatedFollowUps: [];
    try {
      let followUpsEvents = await FollowUpEventModel.listActivatedEventsByFollowUp();
      activatedFollowUps = await FollowUpModel.listAllActivated(followUpsEvents);
    } catch (e) {
      throw new InternalServerErrorResponse()
    }

    if(activatedFollowUps.length > 0){
      return new SuccessResponse(activatedFollowUps);
    } else {
      throw new NotFoundResponse()
    }
  }
};
