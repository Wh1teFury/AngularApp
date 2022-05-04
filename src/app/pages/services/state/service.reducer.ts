import { Action, createReducer, on } from "@ngrx/store";
import {
  addServiceSuccess,
  deleteServiceSuccess,
  loadServicesSuccess,
  updateServiceSuccess
} from "./service.actions";
import { initialState, ServiceState } from "./service.state";

const _servicesReducer = createReducer(
  initialState,
  on(loadServicesSuccess, (state, action) => {
    return {
      ...state,
      services: action.services,
    }
  }),
  on(addServiceSuccess, (state, action) => {
    let service = { ...action.service };
    return {
      ...state,
      services: [...state.services, service],
    };
  }),
  on(updateServiceSuccess, (state, action) => {
    const updateService = state.services.map((service) => {
      return action.service.id === service.id ? action.service : service;
    });
    return {
      ...state,
      services: updateService,
    };
  }),
  on(deleteServiceSuccess, (state, { id }) => {
    const updateService = state.services.filter((service) => {
      return service.id !== id;
    });
    return {
      ...state,
      services: updateService,
    };
  })
);

export function servicesReducer(state: ServiceState | undefined, action: Action) {
  return _servicesReducer(state, action);
}