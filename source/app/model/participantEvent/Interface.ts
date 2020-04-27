import {Document, Model, Types} from 'mongoose';
import ObjectId = Types.ObjectId;

export default interface IParticipantEvent extends Document {
  _id: ObjectId;
  objectType: string;
  eventId: ObjectId;
  participant: ObjectId;
  date: string;
  description: string;
  activated: Boolean;
  status: String;
}

export interface IParticipantEventModel extends Model<IParticipantEvent> {
  exist(participant: ObjectId, event: ObjectId): Promise<any>
  getByEvent(id: ObjectId): Promise<any>
  getEventsByParticipant(id: ObjectId): Promise<any>
  listAll(id: ObjectId): Promise<any>
}

