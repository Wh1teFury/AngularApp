import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface IAuth {
  id?: string,
  auth: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  getAuth(): Observable<IAuth[]> {
    return this.http.get<IAuth[]>('https://app-ang-b39b1-default-rtdb.firebaseio.com/auth.json')
      .pipe(map((data) => {
        const auth: IAuth[] = [];
        for (let key in data) { auth.push({ ...data[key], id: key }) }
        return auth;
      }))
  }
  updateAuth(auth: IAuth) {
    const authData = { [`${auth.id}`]: { auth: auth.auth } };
    return this.http.patch('https://app-ang-b39b1-default-rtdb.firebaseio.com/auth.json', authData);
  }
}
