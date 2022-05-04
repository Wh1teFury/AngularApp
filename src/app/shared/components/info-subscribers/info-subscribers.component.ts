import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { COMPLETED, CREATED, GREEN, ORANGE, PROGRESS, RED, REJECTED, YELLOW } from 'src/app/const/const';
import { IOrder } from 'src/app/models/IOrder';
import { ISubscriber } from 'src/app/models/ISubscribers';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-info-subscribers',
  templateUrl: './info-subscribers.component.html',
  styleUrls: ['./info-subscribers.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoSubscribersComponent implements OnInit {
  ordersCreated$!: Observable<IOrder[]>;
  ordersCompleted$!: Observable<IOrder[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ISubscriber,
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialogRef<InfoSubscribersComponent>
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
