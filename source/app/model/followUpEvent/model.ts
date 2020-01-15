import * as mongoose from "mongoose";
import EventSchema from "./Schema";
import IEvent from "./Interface";
import AutoFillEventSchema from "./autoFillEvent/Schema";
import IAutoFill from "./autoFillEvent/Interface";
const ModelName = 'FollowUpEvent';
const CollectionName = 'follow-up';

let EventsModel = mongoose.model<IEvent>(ModelName, EventSchema, CollectionName);

EventsModel.discriminator<IAutoFill>('ActivityAutoFillEvent',AutoFillEventSchema);

export default EventsModel