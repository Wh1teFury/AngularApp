import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { ISubscriber } from '../models/ISubscribers';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private http: HttpClient) { }

  getSubscribers(): Observable<ISubscriber[]> {
    return this.http
      .get<ISubscriber[]>('https://app-ang-b39b1-default-rtdb.firebaseio.com/subscriber.json')
      .pipe(
        map((data) => {
          const subscribers: ISubscriber[] = [];
          for (let key in data) {
            subscribers.push({ ...data[key], id: key });
          }
          return subscribers;
        })
      )
  }
  addSubscriber(subscriber: ISubscriber): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      'https://app-ang-b39b1-default-rtdb.firebaseio.com/subscriber/.json',
      subscriber
    )
  }
  updateSubscriber(subscriber: ISubscriber) {
    const subscriberData = {
      [`${subscriber.id}`]: {
        login: subscriber.login,
        role: subscriber.role,
        fullname: subscriber.fullname,
        description: subscriber.description,
        address: subscriber.address,
        date: subscriber.date,
        tel: subscriber.tel
      },
    };
    return this.http.patch(
      'https://app-ang-b39b1-default-rtdb.firebaseio.com/subscriber.json',
      subscriberData
    )
  }
  deleteSubscriber(id: string) {
    return this.http.delete(
      `https://app-ang-b39b1-default-rtdb.firebaseio.com/subscriber/${id}.json`,
    )
  }
}
