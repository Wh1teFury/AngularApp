import { Action, createReducer, on } from "@ngrx/store";
import {
  addOrderSuccess,
  deleteOrderSuccess,
  loadOrdersSuccess,
  updateOrderSuccess
} from "./order.actions";
import { initialState, OrderState } from "./order.state";

const _ordersReducer = createReducer(
  initialState,
  on(loadOrdersSuccess, (state, action) => {
    return {
      ...state,
      orders: action.orders,
    }
  }),
  on(addOrderSuccess, (state, action) => {
    let order = { ...action.order };
    return {
      ...state,
      orders: [...state.orders, order],
    };
  }),
  on(updateOrderSuccess, (state, action) => {
    const updateOrder = state.orders.map((order) => {
      return action.order.id === order.id ? action.order : order;
    });
    return {
      ...state,
      orders: updateOrder,
    };
  }),
  on(deleteOrderSuccess, (state, { id }) => {
    const updateOrder = state.orders.filter((order) => {
      return order.id !== id;
    });
    return {
      ...state,
      orders: updateOrder,
    };
  })
);

export function ordersReducer(state: OrderState | undefined, action: Action) {
  return _ordersReducer(state, action);
}