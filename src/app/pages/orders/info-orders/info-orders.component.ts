import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { COMPLETED, CREATED, NEW_DATE, ORDER_ACTUAL_DATE, ORDER_STATUS, PROGRESS, REJECTED, TODAY_DATE } from 'src/app/const/const';
import { IOrder } from 'src/app/models/IOrder';
import { AppState } from 'src/app/store/app.state';
import { InfoSubscribersComponent } from '../../../shared/components/info-subscribers/info-subscribers.component';
import { deleteOrder, loadOrders, updateOrder } from '../state/order.actions';
import { getOrders } from '../state/order.selector';
import { UpdateOrdersComponent } from '../update-orders/update-orders.component';

@Component({
  selector: 'app-info-orders',
  templateUrl: './info-orders.component.html',
  styleUrls: ['./info-orders.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoOrdersComponent implements OnInit {
  id!: string;
  url!: string;
  order$!: Observable<IOrder[]>;
  allow: boolean = true;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.url = this.route.snapshot.parent?.params['id'];
    const role = this.route.snapshot.parent?.params['id'].slice(0, 5);
    if (role === 'users') {
      this.allow = !this.allow;
    }
    this.route.params.subscribe((data) => {
      if (data['id'] !== this.id) {
        this.id = data['id'];
        this.store.dispatch(loadOrders());
      }
    })
    this.order$ = this.store.select(getOrders).pipe(
      map((orders) => {
        return orders.filter((order) => order.id === this.id)
      })
    ).pipe(
      map((orders) => {
        return orders.map((orders) => {
          if (orders.status === CREATED && orders.actualDate === '') {
            if (NEW_DATE(orders.dateOfCreation) < NEW_DATE(TODAY_DATE()) && NEW_DATE(TODAY_DATE()) <= NEW_DATE(orders.estimatedDate)) {
              const order: IOrder = ORDER_STATUS(orders, PROGRESS);
              this.store.dispatch(updateOrder({ order }));
              return orders
            }
          }
          if (orders.status === PROGRESS) {
            if (NEW_DATE(TODAY_DATE()) > NEW_DATE(orders.estimatedDate)) {
              const order: IOrder = ORDER_STATUS(orders, COMPLETED);
              this.store.dispatch(updateOrder({ order }));
              return orders
            }
          }
          if (orders.actualDate === '') {
            if (orders.status === COMPLETED || orders.status === REJECTED) {
              const order: IOrder = ORDER_ACTUAL_DATE(orders)
              this.store.dispatch(updateOrder({ order }))
            }
          }
          return orders
        })
      })
    )
  }
  onInfoSubscriber(order: IOrder, event: Event) {
    event.preventDefault();
    this.dialog.open(InfoSubscribersComponent, {
      data: {
        login: order.subscriber?.login,
        role: order.subscriber?.role,
        url: this.url,
        id: order.subscriber?.id,
        fullname: order.subscriber?.fullname,
        address: {
          city: order.subscriber?.address.city,
          street: order.subscriber?.address.street,
          number: order.subscriber?.address.number,
          apartment: order.subscriber?.address.apartment,
        },
        tel: order.subscriber?.tel,
        description: order.subscriber?.description,
        date: order.subscriber?.date,
      }
    })
  }
  onDeleteOrder(order: IOrder) {
    const id = order.id
    if (id) {
      this.store.dispatch(deleteOrder({ id }));
    }
    this.router.navigate(['orders']);
  }
  onDisabled(value: string): boolean {
    return value === COMPLETED || value === REJECTED ? true : false
  }
  onUpdateOrder(order: IOrder, event: Event) {
    event.preventDefault();
    this.dialog.open(UpdateOrdersComponent, {
      data: { ...order }
    })
  }
}
