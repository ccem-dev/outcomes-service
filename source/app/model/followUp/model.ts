import * as mongoose from "mongoose";
import FollowUpSchema from "./Schema";
import IFollowUp, {IFollowUpModel} from "./Interface";
const ModelName = 'FollowUp';
const CollectionName = 'follow-up';

let followUpModel = mongoose.model<IFollowUp, IFollowUpModel>(ModelName , FollowUpSchema, CollectionName);

export default followUpModel;