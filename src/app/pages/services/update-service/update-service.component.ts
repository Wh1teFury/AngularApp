import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IService } from 'src/app/models/IService';
import { AppState } from 'src/app/store/app.state';
import { updateService } from '../state/service.actions';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateServiceComponent implements OnInit {

  serviceForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    activity: new FormControl(''),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: IService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.serviceForm.setValue({
      name: this.data?.name,
      description: this.data?.description,
      activity: this.data?.activity,
    })
  }
  onUpdateService() {
    const name = this.serviceForm.value.name;
    const description = this.serviceForm.value.description;
    const activity = this.serviceForm.value.activity;
    const service: IService = {
      id: this.data.id,
      name,
      description,
      activity,
    }
    this.store.dispatch(updateService({ service }))
  }

}
