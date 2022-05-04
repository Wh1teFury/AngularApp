import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable } from 'rxjs';
import { IOrder } from '../models/IOrder';
import { SubscriberService } from './subscriber.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private subscriberService: SubscriberService) { }

  getOrder(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(
      'https://app-ang-b39b1-default-rtdb.firebaseio.com/order.json'
    ).pipe(map((order) => {
      let orderData: IOrder[] = [];
      for (let id in order) {
        orderData.push({ ...order[id], id });
      }
      return orderData;
    }))
  }
  getOrderWithSubscriber() {
    return this.getOrder().pipe(
      mergeMap((orders) => {
        return this.subscriberService.getSubscribers().pipe(
          map((subscribers) => {
            return orders.map((order) => {
              return {
                ...order,
                subscriber: subscribers.find(
                  (subscriber) => subscriber.id === order.subscribersId
                ),
                subscriberName: subscribers.find(
                  (subscriber) => subscriber.id === order.subscribersId
                )?.fullname
              }
            })
          })
        )
      })
    )
  }
  addOrder(order: IOrder): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      'https://app-ang-b39b1-default-rtdb.firebaseio.com/order.json',
      order
    )
  }
  updateOrder(order: IOrder) {
    const serviceData = {
      [`${order.id}`]: {
        name: order.name,
        description: order.description,
        subscribersId: order.subscribersId,
        status: order.status,
        serviceId: order.serviceId,
        dateOfCreation: order.dateOfCreation,
        estimatedDate: order.estimatedDate,
        actualDate: order.actualDate,
      },
    };
    return this.http.patch(
      'https://app-ang-b39b1-default-rtdb.firebaseio.com/order.json',
      serviceData
    )
  }
  deleteOrder(id: string | undefined) {
    return this.http.delete(
      `https://app-ang-b39b1-default-rtdb.firebaseio.com/order/${id}.json`,
    )
  }
}
