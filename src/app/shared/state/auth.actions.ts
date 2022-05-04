import { createAction, props } from "@ngrx/store";
import { IAuth } from "src/app/services/auth.service";

export const LOAD_AUTH = '[auth page] load auth';
export const LOAD_AUTH_SUCCESS = '[auth page] load auth success';
export const UPDATE_AUTH = '[auth page] update auth';
export const UPDATE_AUTH_SUCCESS = '[auth page] update auth success';

export const loadAuth = createAction(LOAD_AUTH);
export const loadAuthSuccess = createAction(LOAD_AUTH_SUCCESS, props<{ auth: IAuth[] }>());
export const updateAuth = createAction(UPDATE_AUTH, props<({ auth: IAuth })>());
export const updateAuthSuccess = createAction(UPDATE_AUTH_SUCCESS, props<({ auth: IAuth })>());

