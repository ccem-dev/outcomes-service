import {Document, Types} from 'mongoose';
import ObjectId = Types.ObjectId;

export default interface IEvent extends Document {
  followUpId: ObjectId;
  objectType: string;
  description: string;
  order: Number;
}
