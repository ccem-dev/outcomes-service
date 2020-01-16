import {Schema} from "mongoose";

const autoFillEvent = new Schema({
  acronym:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  }
},
  {
    discriminatorKey: 'objectType',
    versionKey: false
  });

export default autoFillEvent;