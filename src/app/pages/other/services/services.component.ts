import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
  role!: string;
  allow: boolean = true;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.role = this.route.snapshot.parent?.params['id'].slice(0, 5);
    if (this.role === 'guest' || this.role === 'users') {
      this.allow = !this.allow
    }
  }

}
