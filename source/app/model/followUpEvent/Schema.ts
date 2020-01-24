import {Schema, Types} from "mongoose";
import IParticipantEvent from "../participantEvent/Interface";
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

eventSchema.statics.listActivatedEventsByParticipant = async function (participantEvents: [IParticipantEvent]) {
  return this.collection.aggregate(
    [
      {
        $match:{
          "activated": true,
        }
      },
      {
        $addFields: {
          participantEvents: {
            $arrayElemAt: [{
              $filter: {
                input: participantEvents,
                as: "participantEvent",
                cond: {
                  $and: [
                    {$eq: ["$$participantEvent._id", "$_id"]}
                  ]
                }
              }
            },
              0]
          }
        }
      },
      {
        $addFields: {
          "participantEvents": "$participantEvents.eventIds"
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