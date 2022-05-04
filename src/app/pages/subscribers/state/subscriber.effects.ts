import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { SubscriberService } from "src/app/services/subscriber.service";
import { addSubscriber, addSubscriberSuccess, deleteSubscriber, deleteSubscriberSuccess, loadSubscribers, loadSubscribersSuccess, updateSubscriber, updateSubscriberSuccess } from "./subscriber.actions";


@Injectable()
export class SubscribersEffects {
  constructor(private actions$: Actions, private subscriberService: SubscriberService) { }

  loadSubscribers$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadSubscribers),
        mergeMap((action) => {
          return this.subscriberService.getSubscribers().pipe(
            map((subscribers) => {
              return loadSubscribersSuccess({ subscribers })
            })
          )
        })
      )
    }
  )

  addSubscriber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addSubscriber),
      mergeMap((action) => {
        return this.subscriberService.addSubscriber(action.subscriber).pipe(
          map((data) => {
            const subscriber = { ...action.subscriber, id: data.name };
            return addSubscriberSuccess({ subscriber })
          })
        )
      }))
  });

  updateSubscriber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateSubscriber),
      switchMap((action) => {
        return this.subscriberService.updateSubscriber(action.subscriber).pipe(
          map((data) => {
            return updateSubscriberSuccess({ subscriber: action.subscriber })
          })
        );
      })
    );
  });

  deleteSubscriber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteSubscriber),
      switchMap((action) => {
        return this.subscriberService.deleteSubscriber(action.id).pipe(
          map((data) => {
            return deleteSubscriberSuccess({ id: action.id })
          })
        );
      })
    );
  });
}