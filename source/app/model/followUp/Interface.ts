import {Document, Model, Types} from 'mongoose';
import ObjectId = Types.ObjectId;
import IParticipantEvent from "../participantEvent/Interface";

export default interface IFollowUp extends Document {
  _id: ObjectId;
  objectType: string;
  description: string;
  windowBetween: number;
  time: number;
  activated:Boolean;
  order:number;
}

export interface IFollowUpModel extends Model<IFollowUp> {
  listAllActivatedByParticipant(followUps:[IFollowUp], participantEvents: [IParticipantEvent]): Promise<any>
  listAllActivated(followUps:[IFollowUp]): Promise<any>
  get(id: ObjectId): Promise<any>
}
