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
      participant: participant
    };

    if (body.hasOwnProperty("activityId")) {
      json.activityId = body.activityId;
    }
    return json;
  }
}