export class ObjectTypeService {
  static validateObjectType = function(type: string) {
    let participantType = new RegExp(/^Participant/);

    if (participantType.test(type)) {
      return type;
    } else {
      return "Participant".concat(type);
    }
  }

  static validateBody = function(body: any, participant: string) {
    let json: any = {
      objectType: this.validateObjectType(body.objectType),
      eventId: body._id,
      participant: participant,
      emailNotification: body.emailNotification,
      description: body.description
    };

    if (body.hasOwnProperty("activityId")) {
      json.activityId = body.activityId;
      json.name = body.name;
      json.acronym = body.acronym;
    }
    return json;
  }
}