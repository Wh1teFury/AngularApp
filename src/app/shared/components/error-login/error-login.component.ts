import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-login',
  templateUrl: './error-login.component.html',
  styleUrls: ['./error-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
