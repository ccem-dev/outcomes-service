import {Document, Types} from 'mongoose';
import ObjectId = Types.ObjectId;

export default interface IOutcome extends Document {
  acronym:string;
  senderId:ObjectId;
  version:number;
  discarded:boolean;
}

