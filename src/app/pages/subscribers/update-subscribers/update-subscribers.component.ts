import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ISubscriber } from 'src/app/models/ISubscribers';
import { AppState } from 'src/app/store/app.state';
import { updateSubscriber } from '../state/subscriber.actions';

@Component({
  selector: 'app-update-subscribers',
  templateUrl: './update-subscribers.component.html',
  styleUrls: ['./update-subscribers.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateSubscribersComponent implements OnInit {

  subscriberForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    description: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      street: new FormControl(''),
      number: new FormControl(''),
      apartment: new FormControl(''),
    }),
    tel: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    date: new FormControl(''),
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ISubscriber,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscriberForm.setValue({
      fullname: this.data.fullname,
      description: this.data.description,
      address: {
        city: this.data.address.city,
        street: this.data.address.street,
        number: this.data.address.number,
        apartment: this.data.address.apartment,
      },
      tel: this.data.tel,
      date: this.data.date,
    })
  }
  onUpdateSubscriber() {
    const fullname = this.subscriberForm.value.fullname;
    const address = this.subscriberForm.value.address;
    const description = this.subscriberForm.value.description;
    const date = this.subscriberForm.value.date;
    const tel = this.subscriberForm.value.tel;
    const subscriber: ISubscriber = {
      id: this.data.id,
      fullname,
      address,
      description,
      date,
      tel,
    };
    this.store.dispatch(updateSubscriber({ subscriber }))
  }
}
