import IResponse, {InternalServerErrorResponse, NotFoundResponse, SuccessResponse} from '../utils/response';
import IFollowUp from "../model/followUp/Interface";
import {Types} from "mongoose";
import FollowUpModel from "../model/followUp/model";
import FollowUpEventModel from "../model/followUpEvent/model";
import ParticipantEventModel from "../model/participantEvent/model";
import ParticipantEventsService from "./ParticipantEventsService";
import DeadlineService from "./DeadlineService";
import ObjectId = Types.ObjectId;
import {ObjectTypeService} from "./ObjectTypeService";


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

  static async listByParticipant(idParticipant: string): Promise<IResponse> {
    let activatedFollowUps: [any];
    try {
      let participantEvents = await ParticipantEventModel.getEventsByParticipant(new ObjectId(idParticipant));
      let followUpsEvents = await FollowUpEventModel.listActivatedEventsByParticipant(participantEvents);
      activatedFollowUps = await FollowUpModel.listAllActivatedByParticipant(followUpsEvents, participantEvents);
    } catch (e) {
      throw new InternalServerErrorResponse()
    }

    if (activatedFollowUps.length > 0) {
      let max = activatedFollowUps.length;
      for (let i = 0; i < max; i++){
        if (activatedFollowUps[i].participantEvents.length > 0) {
          let _lastFollowUp = false;
          let _mustStart = false;
          let _windowBetween;
          if (max -1 == i) {
            _lastFollowUp = true;
            _windowBetween = 0;
          } else {
            _windowBetween = activatedFollowUps[i+1].windowBetween;
            _mustStart = activatedFollowUps[i].participantEvents[0].status != "ACCOMPLISHED" && activatedFollowUps[i+1].participantEvents.length == 0;
          }
          activatedFollowUps[i].deadline = DeadlineService.getDeadline(activatedFollowUps[i].participantEvents[0].date, activatedFollowUps[i].time, _windowBetween);
          if (activatedFollowUps[i].deadline.remainingDays < 0 && _mustStart){
            _mustStart = true;
          }
          if (_mustStart){
            let json: any = activatedFollowUps[i+1];
            json.eventId = activatedFollowUps[i+1]._id;
            json.participant = idParticipant;
            json._id = null;
            if (activatedFollowUps[i].participantEvents[0].status == "PENDING" || (activatedFollowUps[i].deadline.remainingDays < 0 && _lastFollowUp)) await ParticipantEventsService.accomplishedEvent(new ObjectId(activatedFollowUps[i]._id));
            if (! _lastFollowUp){
              let nextFollowUp = new ParticipantEventModel(json);
              nextFollowUp.objectType = ObjectTypeService.validateObjectType(nextFollowUp.objectType);
              let result: any = await ParticipantEventsService.start(nextFollowUp);
              activatedFollowUps[i+1].participantEvents.push(result.body.data);
            }
          }

        }
      }

      return new SuccessResponse(activatedFollowUps);
    } else {
      throw new NotFoundResponse()
    }
  }
};
