import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrderState } from "./order.state";

export const ORDER_STATE_NAME = 'order';
const getOrderState = createFeatureSelector<OrderState>(ORDER_STATE_NAME);
export const getOrders = createSelector(getOrderState, (state) => {
  return state.orders;
})