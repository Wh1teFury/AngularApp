import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './shared/components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './pages/main/main.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { ServicesComponent } from './pages/other/services/services.component';
import { OrdersComponent } from './pages/other/orders/orders.component';
import { SubscribersComponent } from './pages/other/subscribers/subscribers.component';
import { OrdersModule } from './pages/orders/orders.module';
import { SubscribersModule } from './pages/subscribers/subscribers.module';
import { ServicesModule } from './pages/services/services.module';
import { ErrorLoginComponent } from './shared/components/error-login/error-login.component';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MainComponent,
    NavBarComponent,
    ServicesComponent,
    OrdersComponent,
    SubscribersComponent,
    ErrorLoginComponent,
  ],
  imports: [
    BrowserModule,
    OrdersModule,
    SubscribersModule,
    ServicesModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
