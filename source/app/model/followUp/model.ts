import * as mongoose from "mongoose";
import FollowUSchema, {IFollowUpModel} from "./Schema";
import IFollowUp from "./Interface";
const ModelName = 'FollowUp';
const CollectionName = 'follow-up';

let followUpModel = mongoose.model<IFollowUp, IFollowUpModel>(ModelName , FollowUSchema, CollectionName);

export default followUpModel;