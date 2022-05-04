import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IService } from 'src/app/models/IService';
import { AppState } from 'src/app/store/app.state';
import { addService } from '../state/service.actions';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddServiceComponent implements OnInit {
  serviceForm!: FormGroup;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.serviceForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      activity: new FormControl(true),
    })
  }
  onAddService() {
    const service: IService = {
      name: this.serviceForm.value.name,
      description: this.serviceForm.value.description,
      activity: this.serviceForm.value.activity,
    }
    this.store.dispatch(addService({ service }))
  }

}
