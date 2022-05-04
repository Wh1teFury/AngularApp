import { OrderState } from "../pages/orders/state/order.state";
import { ServiceState } from "../pages/services/state/service.state";
import { SubscriberState } from "../pages/subscribers/state/subscriber.state";
import { AuthState } from "../shared/state/auth.state";

export interface AppState {
  services: ServiceState;
  subscribers: SubscriberState;
  orders: OrderState;
  auth: AuthState;
}