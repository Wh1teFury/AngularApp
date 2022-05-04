import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap, skip, switchMap, tap } from "rxjs/operators";
import { OrderService } from "src/app/services/order.service";
import { AppState } from "src/app/store/app.state";
import { addOrder, addOrderSuccess, deleteOrder, deleteOrderSuccess, loadOrders, loadOrdersSuccess, updateOrder, updateOrderSuccess } from "./order.actions";

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private orderService: OrderService, private store: Store<AppState>) { }
  loadOrders$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadOrders),
        mergeMap((action) => {
          return this.orderService.getOrderWithSubscriber().pipe(
            map((orders) => {
              return loadOrdersSuccess({ orders })
            })
          )
        })
      )
    }
  )

  addOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addOrder),
      mergeMap((action) => {
        return this.orderService.addOrder(action.order).pipe(
          map((data) => {
            const order = { ...action.order, id: data.name };
            return addOrderSuccess({ order })
          }),
          tap(() => this.store.dispatch(loadOrders())),
          skip(1)
        )
      }))
  });

  updateOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateOrder),
      switchMap((action) => {
        return this.orderService.updateOrder(action.order).pipe(
          map((data) => {
            return updateOrderSuccess({ order: action.order })
          }),
          tap(() => this.store.dispatch(loadOrders())),
          skip(1)
        );
      })
    );
  });

  deleteOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteOrder),
      switchMap((action) => {
        return this.orderService.deleteOrder(action.id).pipe(
          map((data) => {
            return deleteOrderSuccess({ id: action.id })
          }),
          tap(() => this.store.dispatch(loadOrders())),
          skip(1)
        );
      })
    );
  });
}