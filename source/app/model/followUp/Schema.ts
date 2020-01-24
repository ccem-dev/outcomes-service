import {Schema, Types} from "mongoose";
import IFollowUp from "./Interface";
import ObjectId = Types.ObjectId;
import IParticipantEvent from "../participantEvent/Interface";


const FollowUpSchema: Schema = new Schema(
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

FollowUpSchema.statics.get = async function (id: ObjectId) {
  return this.collection.findOne({"_id": id})
};

FollowUpSchema.statics.listAllActivatedByParticipant = async function (followUps: [IFollowUp], participantEvents: [IParticipantEvent]) {
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
        $project: {
          "_id": 1,
          "objectType": 1,
          "activated": 1,
          "description": 1,
          "windowBetween": 1,
          "time": 1,
          "order": 1,
          "participantEvents": { $cond: [{ $ifNull: ["$participantEvents", false] }, "$participantEvents.eventIds", []] },
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

FollowUpSchema.statics.listAllActivated = async function (followUps: [IFollowUp]) {
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

export default FollowUpSchema;