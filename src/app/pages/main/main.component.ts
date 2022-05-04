import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  role!: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.role = this.route.snapshot.params['id'].substring(0, 5)
  }

}
