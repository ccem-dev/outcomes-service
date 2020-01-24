import {Schema, Types} from "mongoose";
import ObjectId = Types.ObjectId;

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
      type: ObjectId,
      required: true
    },
    activated: {
      type: Boolean,
      default: true
    },
    status:{
      type: String,
      default: "PENDING"
    },
    description: {
      type: String,
      default: ""
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
        $match:{
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

export default ParticipantEventSchema;