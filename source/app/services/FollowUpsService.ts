import IResponse, {SuccessResponse, InternalServerErrorResponse, NotFoundResponse} from '../utils/response';
import IFollowUp from "../model/followUp/Interface";
import {Types} from "mongoose";
import FollowUpModel from "../model/followUp/model";
import FollowUpEventModel from "../model/followUpEvent/model";
import ObjectId = Types.ObjectId;
import ParticipantEventModel from "../model/participantEvent/model";
import ParticipantEventsService from "./ParticipantEventsService";


export default class FollowUpsService {
  static async save(followUp: IFollowUp): Promise<IResponse> {
    let order;
    let lastFollowUpAdded: IFollowUp = await FollowUpModel.findOne().sort({order: -1}).exec();
    try {
      if (lastFollowUpAdded) {
        order = lastFollowUpAdded.order + 1;
      } else {
        order = 0;
      }
      followUp.set("order", order);
      await followUp.save();
      return new SuccessResponse({id: followUp._id});
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

    if (activatedFollowUps.length > 0) {
      return new SuccessResponse(activatedFollowUps);
    } else {
      throw new NotFoundResponse()
    }
  }

  static async getStatus(id: string): Promise<IResponse> {
    let followUp;
    let participantEvent;
    let result;
    try {
      followUp = await FollowUpModel.get(new ObjectId(id));
      participantEvent = await ParticipantEventModel.getByEvent(new ObjectId(id));
      if (followUp && participantEvent) {
        let startDate = participantEvent.date;
        let finalDate = new Date();
        finalDate.setDate(participantEvent.date.getDate() + followUp.time - followUp.windowBetween);
        // @ts-ignore
        let remainingDays = Math.trunc((new Date() - finalDate) / 1000 / 60 / 60/ 24);
        result = {
          startDate: startDate,
          finalDate: finalDate,
          remainingDays: remainingDays
        };

        if (remainingDays < 0) {
            let resultFollowUp = FollowUpModel.findOne({"order": followUp.order + 1})
            let nextFollowUp = new ParticipantEventModel(resultFollowUp);
            await ParticipantEventsService.start(nextFollowUp)
        }
      }

    } catch (e) {
      throw new InternalServerErrorResponse()
    }

    if (followUp && participantEvent) {
      return new SuccessResponse(result)
    } else {
      throw new NotFoundResponse()
    }
  }

  static async listByParticipant(id: string): Promise<IResponse> {
    let activatedFollowUps: [];
    try {
      let participantEvents = await ParticipantEventModel.getEventsByParticipant(new ObjectId(id));
      let followUpsEvents = await FollowUpEventModel.listActivatedEventsByParticipant(participantEvents);
      activatedFollowUps = await FollowUpModel.listAllActivated(followUpsEvents);
    } catch (e) {
      throw new InternalServerErrorResponse()
    }

    if (activatedFollowUps.length > 0) {
      return new SuccessResponse(activatedFollowUps);
    } else {
      throw new NotFoundResponse()
    }
  }

};
