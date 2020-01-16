import IResponse from '../utils/responce';
import FollowUpsService from "../services/FollowUpsService";
import IFollowUp from "../model/followUp/Interface";

export default class FollowUpsController {
  static async add(followUp: IFollowUp): Promise<IResponse> {
    return FollowUpsService.save(followUp);
  }

  static async update(followUp: IFollowUp): Promise<IResponse> {
    return FollowUpsService.update(followUp);
  }

  static async deactivate(followUpId: string): Promise<IResponse> {
    return FollowUpsService.deactivate(followUpId);
  }

  static async list(): Promise<IResponse> {
    return FollowUpsService.list();
  }
};