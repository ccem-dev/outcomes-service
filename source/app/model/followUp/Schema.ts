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

FollowUSchema.statics.listAllActivated = async function (followUps: [IFollowUp]) {
  return this.collection.aggregate(
    [
      {
        $match: {
          activated: true
        }
      },
      {
        $addFields: {
          events: {
            $arrayElemAt: [{
              $filter: {
                input: followUps,
                as: "followUp",
                cond: {
                  $and: [
                    {$eq: ["$$followUp._id", "$_id"]}
                  ]
                }
              }
            },
              0]
          }
        }
      },
      {
        $project: {
          "_id": 1,
          "objectType": 1,
          "activated": 1,
          "description": 1,
          "windowBetween": 1,
          "time": 1,
          "order": 1,
          "events": {$cond: [{$ifNull: ["$events", false]}, "$events.events", []]}
        }
      },
      {
        $sort: {
          order: 1
        }
      }
    ]
  ).toArray()
};

export default FollowUSchema;