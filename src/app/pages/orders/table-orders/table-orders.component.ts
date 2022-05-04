import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { COMPLETED, CORRECT_DATE, CREATED, GREEN, NEW_DATE, ORANGE, ORDER_ACTUAL_DATE, ORDER_STATUS, PROGRESS, RED, REJECTED, TODAY_DATE, YELLOW } from 'src/app/const/const';
import { IOrder } from 'src/app/models/IOrder';
import { AppState } from 'src/app/store/app.state';
import { AddOrdersComponent } from '../add-orders/add-orders.component';
import { deleteOrder, loadOrders, updateOrder } from '../state/order.actions';
import { getOrders } from '../state/order.selector';
import { UpdateOrdersComponent } from '../update-orders/update-orders.component';

@Component({
  selector: 'app-table-orders',
  templateUrl: './table-orders.component.html',
  styleUrls: ['./table-orders.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableOrdersComponent implements OnInit {
  @Input() allow!: boolean;
  @ViewChild(MatSort) sort!: MatSort;
  rangeDate = new FormGroup({
    after: new FormControl(),
    before: new FormControl(),
  });
  filter$ = new BehaviorSubject<string>('');
  date$ = new BehaviorSubject<{ after: string, before: string }>({ after: '', before: '' });
  filterByStatus$ = new BehaviorSubject<string>('');
  displayedColumns: string[] = [' ', 'name', 'subscriber', 'status', 'date', 'action'];
  source$!: Observable<MatTableDataSource<IOrder>>;
  orders$!: Observable<IOrder[]>;
  filterStatus$!: Observable<IOrder[]>;
  filterDate$!: Observable<IOrder[]>;
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.orders$ = this.store.select(getOrders).pipe(
      map((orders) => {
        return orders.map((orders) => {
          if (orders.status === CREATED && orders.actualDate === '') {
            if (NEW_DATE(orders.dateOfCreation) < NEW_DATE(TODAY_DATE()) && NEW_DATE(TODAY_DATE()) <= NEW_DATE(orders.estimatedDate)) {
              const order: IOrder = ORDER_STATUS(orders, PROGRESS);
              this.store.dispatch(updateOrder({ order }));
              return orders
            }
            if (NEW_DATE(TODAY_DATE()) > NEW_DATE(orders.estimatedDate)) {
              const order: IOrder = ORDER_STATUS(orders, COMPLETED);
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
    );
    this.onDate();
    this.filterStatus$ = combineLatest([
      this.orders$,
      this.filterByStatus$
    ]).pipe(
      map(([orders, filter]) => {
        return filter === 'Reset' || filter === '' ? orders : orders.filter((order) => order.status === filter)
      })
    )
    this.filterDate$ = combineLatest([
      this.filterStatus$,
      this.date$
    ]).pipe(
      map(([orders, dateBefore]) => {
        return (dateBefore.after !== null && dateBefore.before !== null) ? orders.filter((order) => NEW_DATE(CORRECT_DATE(`${dateBefore.after}`)) <= NEW_DATE(order.dateOfCreation) &&
          NEW_DATE(CORRECT_DATE(`${dateBefore.before}`)) >= NEW_DATE(order.dateOfCreation)) : dateBefore.after !== null ?
          orders.filter((order) => NEW_DATE(CORRECT_DATE(`${dateBefore.after}`)) <= NEW_DATE(order.dateOfCreation)) :
          dateBefore.before !== null ? orders.filter((order) => NEW_DATE(CORRECT_DATE(`${dateBefore.before}`)) >= NEW_DATE(order.dateOfCreation)) : orders
      })
    )
    this.source$ = combineLatest([
      this.filterDate$.pipe(map((orders) => new MatTableDataSource(orders))),
      this.filter$
    ]).pipe(
      map(([source, filter]) => {
        source.filter = filter || '';
        source.sort = this.sort;
        return source;
      })
    )
    this.store.dispatch(loadOrders())
  }
  onAddOrder(event: Event) {
    event.preventDefault();
    this.dialog.open(AddOrdersComponent, {
      data: {
        id: '',
        role: ''
      }
    })
  }
  onUpdateOrder(order: IOrder, event: Event) {
    event.preventDefault();
    this.dialog.open(UpdateOrdersComponent, {
      data: { ...order }
    })
  }
  onDeleteOrder(id: string) {
    this.store.dispatch(deleteOrder({ id }));
  }
  onSearch(value: string) {
    this.filter$.next(value)
  }
  onSortByStatus(value: string) {
    this.filterByStatus$.next(value)
  }
  onDate() {
    const date = {
      after: this.rangeDate.value.after,
      before: this.rangeDate.value.before
    }
    this.date$.next(date)
  }
  getColor(value: string): string {
    return value === 'Completed' ? GREEN :
      value === 'in Progress' ? ORANGE :
        value === 'Created' ? YELLOW : RED
  }
  onInfo(value: string, event: Event) {
    event.preventDefault();
    this.router.navigate([`${this.route.snapshot.parent?.params['id']}/orders`, `${value}`])
  }
}