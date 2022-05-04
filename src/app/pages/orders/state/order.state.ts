import { IOrder } from "src/app/models/IOrder";

export interface OrderState {
  orders: IOrder[];
};

export const initialState: OrderState = {
  orders: [],
};
