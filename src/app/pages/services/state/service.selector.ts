import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ServiceState } from "./service.state";

export const SERVICE_STATE_NAME = 'service';
const getServiceState = createFeatureSelector<ServiceState>(SERVICE_STATE_NAME);
export const getServices = createSelector(getServiceState, (state) => {
  return state.services;
})