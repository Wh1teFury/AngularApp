import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {
  role!: string;
  allow: boolean = true;
  admin: boolean = true;
  users: boolean = true;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.role = this.route.snapshot.parent?.params['id'].slice(0, 5);
    if (this.role === 'users') {
      this.admin = !this.admin;
    } else {
      this.users = !this.users;
    }
    if (this.role === 'guest') {
      this.allow = !this.allow
    }
  }

}
