import * as mongoose from "mongoose";
import OutcomeSchema from "./Schema";
import ISurvey from "./Interface";

mongoose.model<ISurvey>('Outcome', OutcomeSchema);