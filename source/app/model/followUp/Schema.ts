import {Schema, Document, Model} from "mongoose";
import IFollowUp from "./Interface";

const FollowUSchema: Schema = new Schema(
  {
    objectType: {
      type: String,
      default: "followUp"
    },
    description: {
      type: String
    },
    windowBetween: {
      type: Number,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    activated: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false
  }
);

FollowUSchema.statics.listAll = async function () {
 return this.collection.aggregate(
   [

   ]
 ).exec()
};

export interface IFollowUpModel extends Model<IFollowUp> {
  listAll(): Promise<any>
}

export default FollowUSchema;