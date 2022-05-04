import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AUTH } from 'src/app/const/const';
import { IAuth } from 'src/app/services/auth.service';
import { SubscriberService } from 'src/app/services/subscriber.service';
import { AppState } from 'src/app/store/app.state';
import { loadAuth, updateAuth } from '../../state/auth.actions';
import { getAuth } from '../../state/auth.selector';
import { ErrorLoginComponent } from '../error-login/error-login.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private subscriberService: SubscriberService,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    const auth: IAuth = { id: AUTH, auth: false }
    this.store.dispatch(updateAuth({ auth }))
  }

  onLogin() {
    const auth: IAuth = { id: AUTH, auth: true }
    this.store.dispatch(updateAuth({ auth }))
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.subscriberService.getSubscribers().subscribe(data => {
      const subscriber = data.find(data => data.login?.email === email && data.login?.password === password);
      if (subscriber === undefined) {
        this.dialog.open(ErrorLoginComponent);
      } else {
        this.store.select(getAuth).subscribe((data) => {
          if (data[0].auth === true) {
            let role = subscriber?.role?.toLowerCase();
            if (role === 'user') { role = `${role}s` };
            this.router.navigate(['', `${role}${subscriber?.id}`]);
          }
        })
      }
    })
  }
}
