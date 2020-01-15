import {Schema, Types} from "mongoose";
import ObjectId = Types.ObjectId;

const eventSchema = new Schema(
  {
    followUpId: {
      type: ObjectId,
      required: true
    },
    objectType: {
      type:String,
      required: true
    },
    description: {
      type:String,
      required: true
    },
    order: {
      type:Number,
      required: true
    }
  },
  {
    discriminatorKey: 'objectType',
    versionKey: false
  }
);

export default eventSchema;