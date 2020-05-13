import {Schema, Types} from "mongoose";
import ObjectId = Types.ObjectId;

const autoFill = new Schema({
    acronym: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    activityId: {
      type: ObjectId,
      required: true
    }
  },
  {
    discriminatorKey: 'objectType',
    versionKey: false
  });

export default autoFill;