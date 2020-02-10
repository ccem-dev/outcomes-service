import {Schema, Types} from "mongoose";
import ObjectId = Types.ObjectId;

const autoFill = new Schema({
  activityId:{
    type:ObjectId,
    required:true
  }
},
  {
    discriminatorKey: 'objectType',
    versionKey: false
  });

export default autoFill;