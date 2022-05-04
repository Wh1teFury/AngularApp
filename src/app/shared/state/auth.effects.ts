import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap, skip, switchMap, tap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { loadAuth, loadAuthSuccess, updateAuth, updateAuthSuccess } from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private auth: AuthService, private store: Store<AppState>) { }

  loadAuth$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadAuth),
        mergeMap((action) => {
          return this.auth.getAuth().pipe(
            map((auth) => {
              return loadAuthSuccess({ auth })
            })
          )
        })
      )
    }
  )
  updateAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateAuth),
      switchMap((action) => {
        return this.auth.updateAuth(action.auth).pipe(
          map((data) => {
            return updateAuthSuccess({ auth: action.auth })
          })
        );
      })
    );
  });

}