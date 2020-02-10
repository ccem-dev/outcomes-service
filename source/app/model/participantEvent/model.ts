import * as mongoose from "mongoose";
import ParticipantEventSchema from "./Schema";
import IParticipantEvent, {IParticipantEventModel} from "./Interface";
import AutoFillSchema from "./autoFillEvent/Schema"
import IAutoFillEvent from "./autoFillEvent/Interface";
const ModelName = 'ParticipantEvent';
const CollectionName = 'participant-event';

let ParticipantEventModel = mongoose.model<IParticipantEvent, IParticipantEventModel>(ModelName , ParticipantEventSchema, CollectionName);

ParticipantEventModel.discriminator<IAutoFillEvent>('ParticipantActivityAutoFillEvent',AutoFillSchema);

export default ParticipantEventModel;