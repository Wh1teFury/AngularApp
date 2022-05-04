import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ISubscriber } from 'src/app/models/ISubscribers';
import { AppState } from 'src/app/store/app.state';
import { addSubscriber } from '../state/subscriber.actions';


@Component({
  selector: 'app-add-subscribers',
  templateUrl: './add-subscribers.component.html',
  styleUrls: ['./add-subscribers.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSubscribersComponent implements OnInit {
  subscriberForm!: FormGroup;
  constructor(private store: Store<AppState>) { }
  private correctDate() {
    const month: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let nowDate: string = new Date().toString().slice(4, 15);
    let nowDay: string = nowDate.slice(4, 6);
    let nowYear: string = nowDate.slice(7, 11);
    let nowMonth: number = month.indexOf(nowDate.slice(0, 3)) + 1;
    if (nowMonth < 10) {
      return `${nowDay}.0${nowMonth}.${nowYear}`;
    }
    return `${nowDay}.${nowMonth}.${nowYear}`;
  }
  ngOnInit(): void {
    this.subscriberForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      description: new FormControl(''),
      address: new FormGroup({
        city: new FormControl(''),
        street: new FormControl(''),
        number: new FormControl(''),
        apartment: new FormControl(''),
      }),
      tel: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
      date: new FormControl(this.correctDate()),
    })
  }
  onAddSubscriber() {
    const subscriber: ISubscriber = {
      fullname: this.subscriberForm.value.fullname,
      address: this.subscriberForm.value.address,
      description: this.subscriberForm.value.description,
      date: this.subscriberForm.value.date,
      tel: this.subscriberForm.value.tel
    }
    this.store.dispatch(addSubscriber({ subscriber }))
  }
}
