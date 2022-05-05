import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './pages/main/main.component'
import { InfoOrdersComponent } from './pages/orders/info-orders/info-orders.component';
import { OrdersComponent } from './pages/other/orders/orders.component';
import { ServicesComponent } from './pages/other/services/services.component';
import { SubscribersComponent } from './pages/other/subscribers/subscribers.component';
import { LoginComponent } from './shared/components/login/login.component';

const tablesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'services',
    pathMatch: 'full'
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'subscribers',
    component: SubscribersComponent
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'orders/:id',
    component: InfoOrdersComponent
  },
];

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: ':id',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: tablesRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
