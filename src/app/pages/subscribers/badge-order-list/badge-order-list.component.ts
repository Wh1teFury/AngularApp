import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CREATED, PROGRESS } from 'src/app/const/const';
import { IOrder } from 'src/app/models/IOrder';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-badge-order-list',
  templateUrl: './badge-order-list.component.html',
  styleUrls: ['./badge-order-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeOrderListComponent implements OnInit {

  @Input() id!: string;
  ordersCreated$!: Observable<IOrder[]>;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.ordersCreated$ = this.orderService.getOrderWithSubscriber().pipe(
      map((orders) => {
        return orders.filter((order) => {
          return order.subscribersId === this.id && (order.status === CREATED || order.status === PROGRESS)
        })
      }),
    )
  }
  onHidden(value: number): boolean {
    return value === 0 ? true : false
  }
}
