import { IAuth } from "src/app/services/auth.service";

export interface AuthState {
  auth: IAuth[];
};

export const initialState: AuthState = {
  auth: [],
};