import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { IService } from 'src/app/models/IService';
import { AppState } from 'src/app/store/app.state';
import { AddServiceComponent } from '../add-service/add-service.component';
import { deleteService, loadServices } from '../state/service.actions';
import { getServices } from '../state/service.selector';
import { UpdateServiceComponent } from '../update-service/update-service.component';

@Component({
  selector: 'app-table-services',
  templateUrl: './table-services.component.html',
  styleUrls: ['./table-services.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableServicesComponent implements OnInit {
  @Input() allow!: boolean;
  @ViewChild(MatSort) sort!: MatSort;
  filter$ = new BehaviorSubject<string>('');
  displayedColumns: string[] = ['name', 'description', 'activity', 'action'];
  source$!: Observable<MatTableDataSource<IService>>;
  services$!: Observable<IService[]>;
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.services$ = this.store.select(getServices);
    this.source$ = combineLatest([
      this.services$.pipe(map((services) => new MatTableDataSource(services))),
      this.filter$
    ]).pipe(
      map(([source, filter]) => {
        source.filter = filter || '';
        source.sort = this.sort;
        return source;
      })
    )
    this.store.dispatch(loadServices())
  }
  onUpdateService(service: IService, event: Event) {
    event.preventDefault();
    this.dialog.open(UpdateServiceComponent, {
      data: { ...service }
    })
  }
  onDeleteService(id: string) {
    this.store.dispatch(deleteService({ id }));
  }
  onAddService(event: Event) {
    event.preventDefault();
    this.dialog.open(AddServiceComponent)
  }
  onSearch(value: string) {
    this.filter$.next(value)
  }
}
