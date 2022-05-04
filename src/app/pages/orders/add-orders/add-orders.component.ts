import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CREATED, ESTIMATED_DATE, TODAY_DATE } from 'src/app/const/const';
import { IOrder } from 'src/app/models/IOrder';
import { IService } from 'src/app/models/IService';
import { ISubscriber } from 'src/app/models/ISubscribers';
import { SubscriberService } from 'src/app/services/subscriber.service';
import { AppState } from 'src/app/store/app.state';
import { loadServices } from '../../services/state/service.actions';
import { getServices } from '../../services/state/service.selector';
import { addOrder } from '../state/order.actions';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOrdersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'select'];
  services$!: Observable<IService[]>;
  subscribers$!: Observable<ISubscriber[]>;
  filterSubscriber$ = new BehaviorSubject<string>('');
  filterService$ = new BehaviorSubject<string>('');
  sourceSubscriber$!: Observable<ISubscriber[]>;
  sourceService$!: Observable<IService[]>;
  selection = new SelectionModel<IService>(true, []);
  dataSource = new MatTableDataSource<IService>([]);
  allow: boolean = true;
  orderForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    subscribersId: new FormControl('', Validators.required),
  });

  constructor(
    private store: Store<AppState>,
    private subscriberService: SubscriberService,
    @Inject(MAT_DIALOG_DATA) private data: { id: string, role: string },
  ) { }

  displayFn(subject: ISubscriber) {
    return subject ? `${subject.fullname} / +7${subject.tel}` : '';
  }

  ngOnInit(): void {
    if (this.data.role === 'users') {
      this.allow = !this.allow;
      this.orderForm.setValue({
        name: '',
        description: '',
        subscribersId: this.data.id
      })
    }
    this.services$ = this.store.select(getServices);
    this.store.dispatch(loadServices());
    this.services$.subscribe((data) => this.dataSource.data = data)
    this.subscribers$ = this.subscriberService.getSubscribers();
    this.sourceSubscriber$ = combineLatest([
      this.subscribers$,
      this.filterSubscriber$
    ]).pipe(
      map(([subscribers, filterSubscriber]) => {
        return filterSubscriber === '' ? subscribers : subscribers
          .filter(item => item.fullname.toLocaleLowerCase().includes(filterSubscriber.toLocaleLowerCase()) ||
            item.tel.includes(filterSubscriber));
      })
    );
    this.sourceService$ = combineLatest([
      this.services$,
      this.filterService$
    ]).pipe(
      map(([services, filterService]) => {
        return filterService === '' ? services : services
          .filter(item => item.name.toLocaleLowerCase().includes(filterService.toLocaleLowerCase()))
      })
    )
  }
  onAddOrder() {
    let subscribersId = this.orderForm.value.subscribersId;
    if (this.data.id === '') {
      subscribersId = this.orderForm.value.subscribersId.id;
    }
    const order: IOrder = {
      name: this.orderForm.value.name,
      description: this.orderForm.value.description,
      subscribersId: subscribersId,
      status: CREATED,
      dateOfCreation: TODAY_DATE(),
      serviceId: this.selection.selected,
      estimatedDate: ESTIMATED_DATE(this.selection.selected.length),
      actualDate: ''
    }
    this.store.dispatch(addOrder({ order }));
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  checkboxLabel(row?: IService): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
  onSearchSubscriber(value: string) {
    this.filterSubscriber$.next(value)
  }
  onSearchService(value: string) {
    this.filterService$.next(value)
  }
}
