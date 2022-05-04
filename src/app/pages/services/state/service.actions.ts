import { createAction, props } from "@ngrx/store";
import { IService } from "src/app/models/IService";

export const LOAD_SERVICES = '[service page] load services';
export const LOAD_SERVICES_SUCCESS = '[service page] load services success';
export const ADD_SERVICE = '[service page] add service';
export const ADD_SERVICE_SUCCESS = '[service page] add service success';
export const UPDATE_SERVICE = '[service page] update service';
export const UPDATE_SERVICE_SUCCESS = '[service page] update service success';
export const DELETE_SERVICE = '[service page] delete service';
export const DELETE_SERVICE_SUCCESS = '[service page] delete service success';

export const loadServices = createAction(LOAD_SERVICES);
export const loadServicesSuccess = createAction(LOAD_SERVICES_SUCCESS, props<{ services: IService[] }>());
export const addService = createAction(ADD_SERVICE, props<({ service: IService })>());
export const addServiceSuccess = createAction(ADD_SERVICE_SUCCESS, props<({ service: IService })>());
export const updateService = createAction(UPDATE_SERVICE, props<({ service: IService })>());
export const updateServiceSuccess = createAction(UPDATE_SERVICE_SUCCESS, props<({ service: IService })>());
export const deleteService = createAction(DELETE_SERVICE, props<({ id: string })>());
export const deleteServiceSuccess = createAction(DELETE_SERVICE_SUCCESS, props<({ id: string })>());
