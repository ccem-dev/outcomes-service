import {Schema, Types} from "mongoose";
import ObjectId = Types.ObjectId;

enum Variables {
  participant_name = 'participant_name',
  event_name = 'event_name'
}

export class EmailNotification {
  _id: ObjectId;
  variables: string[];

  constructor(data?: any) {
    if (data) {
      this._id = new ObjectId(data._id);
      this.variables = this.validator(data.variables);
    }
  }

  validator(variables: string[]) {
    let result: string[] = [];
    variables.forEach((value: string) => {
      // @ts-ignore
      if (Variables[value] == value) result.push(value);
    });
    return result;
  }

  buildTemplate() {
    let _variables: any = {};
    this.variables.forEach((value) => {
      _variables[value] = '';
    });
    return {
      _id: this._id,
      email: '',
      variables: _variables
    };
  }

}

const emailNotification = new Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
    },
    variables: {
      type: Array,
      required: true
    }
  }
);

export default emailNotification;