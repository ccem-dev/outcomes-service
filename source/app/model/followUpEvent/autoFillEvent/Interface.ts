import {Document, Types} from 'mongoose';
import IEvent from "../Interface";

export default interface IAutoFill extends IEvent,Document {
  acronym: string;
  name: string;
}
