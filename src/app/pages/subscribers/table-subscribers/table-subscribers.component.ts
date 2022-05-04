import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { ISubscriber } from 'src/app/models/ISubscribers';
import { AppState } from 'src/app/store/app.state';
import { AddSubscribersComponent } from '../add-subscribers/add-subscribers.component';
import { InfoSubscribersComponent } from '../../../shared/components/info-subscribers/info-subscribers.component';
import { OrdersListComponent } from '../orders-list/orders-list.component';
import { deleteSubscriber, loadSubscribers } from '../state/subscriber.actions';
import { getSubscribers } from '../state/subscriber.selector';
import { UpdateSubscribersComponent } from '../update-subscribers/update-subscribers.component';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-table-subscribers',
  templateUrl: './table-subscribers.component.html',
  styleUrls: ['./table-subscribers.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSubscribersComponent implements OnInit {
  @Input() allow!: boolean;
  @ViewChild(MatSort) sort!: MatSort;
  url!: string;
  filter$ = new BehaviorSubject<string>('');
  displayedColumns: string[] = ['fullname', 'tel', 'orders', 'action'];
  source$!: Observable<MatTableDataSource<ISubscriber>>;
  subscribers$!: Observable<ISubscriber[]>;
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscribers$ = this.store.select(getSubscribers);
    this.url = this.route.snapshot.parent?.params['id'];
    this.source$ = combineLatest([
      this.subscribers$.pipe(map((subscribers) => new MatTableDataSource(subscribers))),
      this.filter$
    ]).pipe(
      map(([source, filter]) => {
        source.filter = filter || '';
        source.sort = this.sort;
        return source;
      })
    );
    this.store.dispatch(loadSubscribers());
  }

  onInfo(subscriber: ISubscriber, event: Event): void {
    event.preventDefault();
    this.dialog.open(InfoSubscribersComponent, {
      data: {
        login: subscriber.login,
        role: subscriber.role,
        url: this.url,
        id: subscriber.id,
        fullname: subscriber.fullname,
        address: {
          city: subscriber.address.city,
          street: subscriber.address.street,
          number: subscriber.address.number,
          apartment: subscriber.address.apartment,
        },
        tel: subscriber.tel,
        description: subscriber.description,
        date: subscriber.date,
      }
    })
  }
  onAddSubscriber(event: Event) {
    event.preventDefault();
    this.dialog.open(AddSubscribersComponent)
  }
  onUpdateSubscriber(subscriber: ISubscriber, event: Event) {
    event.preventDefault();
    this.dialog.open(UpdateSubscribersComponent, {
      data: { ...subscriber }
    })
  }
  onDeleteSubscriber(id: string) {
    this.store.dispatch(deleteSubscriber({ id }));
  }
  onSearch(value: string) {
    this.filter$.next(value)
  }
  onOpenList(subscriber: ISubscriber, event: Event) {
    event.preventDefault();
    this.dialog.open(OrdersListComponent, {
      data: {
        login: subscriber.login,
        role: subscriber.role,
        url: this.url,
        id: subscriber.id,
        fullname: subscriber.fullname,
        address: {
          city: subscriber.address.city,
          street: subscriber.address.street,
          number: subscriber.address.number,
          apartment: subscriber.address.apartment,
        },
        tel: subscriber.tel,
        description: subscriber.description,
        date: subscriber.date,
      }
    })
  }
}
