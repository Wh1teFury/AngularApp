import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { COMPLETED, ESTIMATED_DATE, REJECTED } from 'src/app/const/const';
import { IOrder } from 'src/app/models/IOrder';
import { IService } from 'src/app/models/IService';
import { ISubscriber } from 'src/app/models/ISubscribers';
import { SubscriberService } from 'src/app/services/subscriber.service';
import { AppState } from 'src/app/store/app.state';
import { loadServices } from '../../services/state/service.actions';
import { getServices } from '../../services/state/service.selector';
import { updateOrder } from '../state/order.actions';

@Component({
  selector: 'app-update-orders',
  templateUrl: './update-orders.component.html',
  styleUrls: ['./update-orders.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateOrdersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'select'];
  status: string[] = [COMPLETED, REJECTED]
  services$!: Observable<IService[]>;
  subscribers$!: Observable<ISubscriber[]>;
  filterSubscriber$ = new BehaviorSubject<string>('');
  filterService$ = new BehaviorSubject<string>('');
  sourceSubscriber$!: Observable<ISubscriber[]>;
  sourceService$!: Observable<IService[]>;
  dataSource = new MatTableDataSource<IService>([]);
  selection = new SelectionModel<IService>(true, []);
  orderForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    subscribersId: new FormControl('', Validators.required),
    status: new FormControl(''),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: IOrder,
    private store: Store<AppState>,
    private subscriberService: SubscriberService,
  ) { }
  displayFn(subject: ISubscriber | undefined) {
    return subject ? `${subject.fullname} / +7${subject.tel}` : '';
  }
  ngOnInit(): void {
    this.services$ = this.store.select(getServices);
    this.store.dispatch(loadServices());
    this.services$.subscribe((data) => {
      this.dataSource.data = data;
      this.selection = new SelectionModel(
        true,
        data.filter((service) => this.data.serviceId.find((s) => s.name === service.name))
      )
    });
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
    this.orderForm.setValue({
      name: this.data?.name,
      description: this.data?.description,
      subscribersId: this.data.subscriber,
      status: this.data.status,
    })
    this.displayFn(this.data.subscriber)
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
  onUpdateOrder() {
    const name = this.orderForm.value.name;
    const description = this.orderForm.value.description;
    const subscribersId = this.orderForm.value.subscribersId.id;
    const status = this.orderForm.value.status;
    const serviceId = this.selection.selected;
    const dateOfCreation = this.data.dateOfCreation
    const estimatedDate = ESTIMATED_DATE(this.selection.selected.length);
    const actualDate = '';
    const order: IOrder = {
      id: this.data.id,
      name,
      description,
      subscribersId,
      serviceId,
      status,
      dateOfCreation,
      estimatedDate,
      actualDate
    }
    this.store.dispatch(updateOrder({ order }));
  }
}
