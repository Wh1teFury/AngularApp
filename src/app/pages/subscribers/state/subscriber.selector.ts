import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SubscriberState } from "./subscriber.state";

export const SUBSCRIBER_STATE_NAME = 'subscriber';
const getSubscriberState = createFeatureSelector<SubscriberState>(SUBSCRIBER_STATE_NAME);
export const getSubscribers = createSelector(getSubscriberState, (state) => {
  return state.subscribers;
})