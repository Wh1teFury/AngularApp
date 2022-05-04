import { Action, createReducer, on } from "@ngrx/store";
import {
  addSubscriberSuccess,
  deleteSubscriberSuccess,
  loadSubscribersSuccess,
  updateSubscriberSuccess
} from "./subscriber.actions";
import { initialState, SubscriberState } from './subscriber.state';

const _subscriberReducer = createReducer(
  initialState,
  on(loadSubscribersSuccess, (state, action) => {
    return {
      ...state,
      subscribers: action.subscribers,
    }
  }),
  on(addSubscriberSuccess, (state, action) => {
    let subscriber = { ...action.subscriber };
    return {
      ...state,
      subscribers: [...state.subscribers, subscriber],
    };
  }),
  on(updateSubscriberSuccess, (state, action) => {
    const updateSubscriber = state.subscribers.map((subscriber) => {
      return action.subscriber.id === subscriber.id ? action.subscriber : subscriber;
    });
    return {
      ...state,
      subscribers: updateSubscriber,
    };
  }),
  on(deleteSubscriberSuccess, (state, { id }) => {
    const updateSubscriber = state.subscribers.filter((subscriber) => {
      return subscriber.id !== id;
    });
    return {
      ...state,
      subscribers: updateSubscriber,
    };
  })
);

export function subscriberReducer(state: SubscriberState | undefined, action: Action) {
  return _subscriberReducer(state, action);
}