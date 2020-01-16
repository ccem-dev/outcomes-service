import {Document, Model, Types} from 'mongoose';
import ObjectId = Types.ObjectId;

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
  listAllActivated(followUps:[IFollowUp]): Promise<any>
}
