import { Action, createReducer, on } from "@ngrx/store";
import { loadAuthSuccess, updateAuthSuccess } from "./auth.actions";
import { initialState, AuthState } from "./auth.state";

const _authReducer = createReducer(
  initialState,
  on(loadAuthSuccess, (state, action) => {
    return {
      ...state,
      auth: action.auth,
    }
  }),
  on(updateAuthSuccess, (state, action) => {
    const updateAuth = state.auth.map((auth) => {
      return action.auth.id === auth.id ? action.auth : auth;
    });
    return {
      ...state,
      auth: updateAuth,
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}