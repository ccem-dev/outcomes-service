import {Schema, Types} from "mongoose";
import ObjectId = Types.ObjectId;
import FollowUSchema from "../followUp/Schema";

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
    },
    activated: {
      type:Boolean,
      default: true
    }
  },
  {
    discriminatorKey: 'objectType',
    versionKey: false
  }
);

eventSchema.statics.listActivatedEventsByFollowUp = async function () {
  return this.collection.aggregate(
    [
      {
        $match:{
          "activated": true
        }
      },
      {
        $sort: {
          "followUpId": 1,
          "order": 1
        }
      },
      {
        $group:{
          _id:"$followUpId",
          events:{$push:"$$ROOT"}
        }
      }
    ]
  ).toArray()
};

export default eventSchema;