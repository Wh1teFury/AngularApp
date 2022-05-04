import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { COMPLETED, CREATED, GREEN, ORANGE, PROGRESS, RED, REJECTED, YELLOW } from 'src/app/const/const';
import { IOrder } from 'src/app/models/IOrder';
import { ISubscriber } from 'src/app/models/ISubscribers';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersListComponent implements OnInit {
  ordersCreated$!: Observable<IOrder[]>;
  ordersCompleted$!: Observable<IOrder[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ISubscriber,
    private orderService: OrderService,
    private router: Router,
    public dialog: MatDialogRef<OrdersListComponent>
  ) { }

  ngOnInit(): void {
    this.ordersCreated$ = this.orderService.getOrderWithSubscriber().pipe(
      map((orders) => {
        return orders.filter((order) => {
          return order.subscribersId === this.data.id && (order.status === CREATED || order.status === PROGRESS)
        }).sort((a, b) => a.status < b.status ? -1 : 1)
      })
    )
    this.ordersCompleted$ = this.orderService.getOrderWithSubscriber().pipe(
      map((orders) => {
        return orders.filter((order) => {
          return order.subscribersId === this.data.id && (order.status === COMPLETED || order.status === REJECTED)
        }).sort((a, b) => a.status < b.status ? -1 : 1)
      })
    )
  }
  getColor(value: string): string {
    return value === 'Completed' ? GREEN :
      value === 'in Progress' ? ORANGE :
        value === 'Created' ? YELLOW : RED
  }
  onInfo(value: string | undefined, event: Event) {
    event.preventDefault();
    const url = this.data.url;
    this.router.navigate([`${url}/orders`, `${value}`]);
    this.dialog.close();
  }
}
