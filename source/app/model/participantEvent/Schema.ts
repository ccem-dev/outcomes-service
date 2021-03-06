import {Schema, Types} from "mongoose";
import ObjectId = Types.ObjectId;
import {StatusEventsType} from "../utils/StatusEventsType";

const ParticipantEventSchema: Schema = new Schema(
  {
    objectType: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    participant: {
      type: ObjectId,
      required: true
    },
    eventId: {
      type: ObjectId
    },
    activated: {
      type: Boolean,
      default: true
    },
    description: {
      type:String,
      required: true
    },
    status: {
      type: String,
      default: "PENDING"
    }
  },
  {
    discriminatorKey: "objectType",
    versionKey: false
  }
);

ParticipantEventSchema.statics.exist = async function (participant: ObjectId, event: ObjectId) {
  return this.collection.findOne(
    {"participant": participant, "eventId": event}
  );
};

ParticipantEventSchema.statics.getByEvent = async function (id: ObjectId) {
  return this.collection.findOne({"eventId": id})
};

ParticipantEventSchema.statics.getEventsByParticipant = async function (id: ObjectId) {
  return this.collection.aggregate([
      {
        $match: {
          "participant": id,
          "activated": true
        }
      },
      {
        $group: {
          "_id": "$eventId",
          "eventIds": {$push: "$$ROOT"}
        }
      }
    ]
  ).toArray()
};

ParticipantEventSchema.statics.listAll = async function (id: ObjectId) {
  let pendingEvents:Array<any> = [];
  let reopenedEvents:Array<any> = [];
  let accomplishedEvents:Array<any> = [];

  pendingEvents = await this.collection.aggregate([
      {
        $match: {
          "status": StatusEventsType.PENDING,
          "participant": id,
          "activated": true,
          "objectType": { $not: /ParticipantFollowUp/}
        }
      },
      {
        $sort: {
          "date": 1
        }
      }
    ]
  ).toArray()


  reopenedEvents = await this.collection.aggregate([
      {
        $match: {
          "status": StatusEventsType.REOPENED,
          "participant": id,
          "activated": true,
          "objectType": { $not: /ParticipantFollowUp/}
        }
      },
      {
        $sort: {
          "date": 1
        }
      }
    ]
  ).toArray()

  accomplishedEvents = await this.collection.aggregate([
      {
        $match: {
          "status": StatusEventsType.ACCOMPLISHED,
          "participant": id,
          "activated": true,
          "objectType": { $not: /ParticipantFollowUp/}
        }
      },
      {
        $sort: {
          "date": 1
        }
      }
    ]
  ).toArray()
  let fullList:Array<any> = pendingEvents.concat(reopenedEvents, accomplishedEvents)
  return fullList
};

export default ParticipantEventSchema;