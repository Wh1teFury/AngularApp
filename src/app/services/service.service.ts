import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { IService } from '../models/IService';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getServices(): Observable<IService[]> {
    return this.http
      .get<IService[]>('https://app-ang-b39b1-default-rtdb.firebaseio.com/service.json')
      .pipe(
        map((data) => {
          const services: IService[] = [];
          for (let key in data) {
            services.push({ ...data[key], id: key });
          }
          return services.sort((a, b) => a.activity < b.activity ? 1 : -1);
        })
      )
  }
  addService(service: IService): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      'https://app-ang-b39b1-default-rtdb.firebaseio.com/service.json',
      service
    )
  }
  updateService(service: IService) {
    const serviceData = {
      [`${service.id}`]: { name: service.name, description: service.description, activity: service.activity },
    };
    return this.http.patch(
      'https://app-ang-b39b1-default-rtdb.firebaseio.com/service.json',
      serviceData
    )
  }
  deleteService(id: string) {
    return this.http.delete(
      `https://app-ang-b39b1-default-rtdb.firebaseio.com/service/${id}.json`,
    )
  }
}
