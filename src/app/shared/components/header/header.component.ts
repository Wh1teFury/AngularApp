import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ISubscriber } from 'src/app/models/ISubscribers';
import { SubscriberService } from 'src/app/services/subscriber.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  subscriber$!: Observable<ISubscriber[]>;
  constructor(
    private route: ActivatedRoute,
    private subscriberService: SubscriberService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'].slice(5);
    this.subscriber$ = this.subscriberService.getSubscribers().pipe(
      map((subscribers) => {
        return subscribers.filter((subscriber) => {
          return subscriber.id === id;
        })
      })
    )
  }

}
