import {Schema, Types} from "mongoose";
import ObjectId = Types.ObjectId;

const OutcomeSchema: Schema = new Schema({
  acronym:{
    type:String,
    required:true
  },
  senderId:{
    type:ObjectId,
    required:true
  },
  version: {
    type:Number,
    required: true
  },
  isDiscarded: {
    type:Boolean,
    default: false
  }
});

OutcomeSchema.set('versionKey', 'modelVersionKey');

export default OutcomeSchema;