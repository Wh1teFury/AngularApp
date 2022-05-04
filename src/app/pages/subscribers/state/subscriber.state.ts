import { ISubscriber } from "src/app/models/ISubscribers";

export interface SubscriberState {
  subscribers: ISubscriber[];
};

export const initialState: SubscriberState = {
  subscribers: [],
};