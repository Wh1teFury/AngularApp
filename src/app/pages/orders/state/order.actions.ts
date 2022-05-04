import { createAction, props } from "@ngrx/store";
import { IOrder } from "src/app/models/IOrder";

export const LOAD_ORDERS = '[order page] load orders';
export const LOAD_ORDERS_SUCCESS = '[order page] load orders success';
export const ADD_ORDER = '[order page] add order';
export const ADD_ORDER_SUCCESS = '[order page] add order success';
export const UPDATE_ORDER = '[order page] update order';
export const UPDATE_ORDER_SUCCESS = '[order page] update order success';
export const DELETE_ORDER = '[order page] delete order';
export const DELETE_ORDER_SUCCESS = '[order page] delete order success';

export const loadOrders = createAction(LOAD_ORDERS);
export const loadOrdersSuccess = createAction(LOAD_ORDERS_SUCCESS, props<{ orders: IOrder[] }>());
export const addOrder = createAction(ADD_ORDER, props<({ order: IOrder })>());
export const addOrderSuccess = createAction(ADD_ORDER_SUCCESS, props<({ order: IOrder })>());
export const updateOrder = createAction(UPDATE_ORDER, props<({ order: IOrder })>());
export const updateOrderSuccess = createAction(UPDATE_ORDER_SUCCESS, props<({ order: IOrder })>());
export const deleteOrder = createAction(DELETE_ORDER, props<({ id: string })>());
export const deleteOrderSuccess = createAction(DELETE_ORDER_SUCCESS, props<({ id: string })>());