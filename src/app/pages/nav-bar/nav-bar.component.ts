import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit {
  @Input() role!: string;
  allow: boolean = true;
  constructor() { }

  ngOnInit(): void {
    if (this.role === 'users') {
      this.allow = !this.allow
    }
  }

}
