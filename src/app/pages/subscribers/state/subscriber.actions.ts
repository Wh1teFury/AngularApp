import { createAction, props } from "@ngrx/store";
import { ISubscriber } from "src/app/models/ISubscribers";

export const LOAD_SUBSCRIBERS = '[subscriber page] load subscribers';
export const LOAD_SUBSCRIBERS_SUCCESS = '[subscriber page] load subscribers success';
export const ADD_SUBSCRIBER = '[subscriber page] add subscriber';
export const ADD_SUBSCRIBER_SUCCESS = '[subscriber page] add subscriber success';
export const UPDATE_SUBSCRIBER = '[subscriber page] update subscriber';
export const UPDATE_SUBSCRIBER_SUCCESS = '[subscriber page] update subscriber success';
export const DELETE_SUBSCRIBER = '[subscriber page] delete subscriber';
export const DELETE_SUBSCRIBER_SUCCESS = '[subscriber page] delete subscriber success';

export const loadSubscribers = createAction(LOAD_SUBSCRIBERS);
export const loadSubscribersSuccess = createAction(LOAD_SUBSCRIBERS_SUCCESS, props<{ subscribers: ISubscriber[] }>());
export const addSubscriber = createAction(ADD_SUBSCRIBER, props<({ subscriber: ISubscriber })>());
export const addSubscriberSuccess = createAction(ADD_SUBSCRIBER_SUCCESS, props<({ subscriber: ISubscriber })>());
export const updateSubscriber = createAction(UPDATE_SUBSCRIBER, props<({ subscriber: ISubscriber })>());
export const updateSubscriberSuccess = createAction(UPDATE_SUBSCRIBER_SUCCESS, props<({ subscriber: ISubscriber })>());
export const deleteSubscriber = createAction(DELETE_SUBSCRIBER, props<({ id: string })>());
export const deleteSubscriberSuccess = createAction(DELETE_SUBSCRIBER_SUCCESS, props<({ id: string })>());
