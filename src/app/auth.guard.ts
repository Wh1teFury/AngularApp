import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadAuth } from './shared/state/auth.actions';
import { getAuth } from './shared/state/auth.selector';
import { AppState } from './store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.store.dispatch(loadAuth())
    this.store.select(getAuth).subscribe((data) => {
      if (data[0].auth === false) {
        this.router.navigate(['login'])
      }
    })
    return true
  }

}
