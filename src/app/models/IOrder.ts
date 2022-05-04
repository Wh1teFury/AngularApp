import { IService } from "./IService";
import { ISubscriber } from "./ISubscribers";

export interface IOrder {
  id?: string,
  name: string,
  description: string,
  subscribersId: string,
  serviceId: IService[],
  status: string,
  dateOfCreation: string,
  estimatedDate: string,
  actualDate: string,
  subscriber?: ISubscriber,
  subscriberName?: string,
}
