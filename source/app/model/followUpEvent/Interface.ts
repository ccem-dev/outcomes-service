import {Document, Model, Types} from 'mongoose';
import ObjectId = Types.ObjectId;
import IParticipantEvent from "../participantEvent/Interface";

export default interface IEvent extends Document {
  followUpId: ObjectId;
  objectType: string;
  description: string;
  order: number;
}

export interface IEventModel extends Model<IEvent> {
  listActivatedEventsByFollowUp(): Promise<any>
  listActivatedEventsByParticipant(participantEvents: IParticipantEvent): Promise<any>
}