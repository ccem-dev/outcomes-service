import {Document, Model, Types} from 'mongoose';
import ObjectId = Types.ObjectId;

export default interface IEvent extends Document {
  followUpId: ObjectId;
  objectType: string;
  description: string;
  order: number;
}

export interface IEventModel extends Model<IEvent> {
  listActivatedEventsByFollowUp(): Promise<any>
}