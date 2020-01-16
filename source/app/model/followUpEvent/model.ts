import * as mongoose from "mongoose";
import EventSchema from "./Schema";
import IEvent, {IEventModel} from "./Interface";
import AutoFillEventSchema from "./autoFillEvent/Schema";
import IAutoFill from "./autoFillEvent/Interface";
const ModelName = 'FollowUpEvent';
const CollectionName = 'follow-up-event';

let EventsModel = mongoose.model<IEvent, IEventModel>(ModelName, EventSchema, CollectionName);

EventsModel.discriminator<IAutoFill>('ActivityAutoFillEvent',AutoFillEventSchema);

export default EventsModel