import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSubscribersComponent } from './add-subscribers/add-subscribers.component';
import { UpdateSubscribersComponent } from './update-subscribers/update-subscribers.component';
import { TableSubscribersComponent } from './table-subscribers/table-subscribers.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { subscriberReducer } from './state/subscriber.reducer';
import { SUBSCRIBER_STATE_NAME } from './state/subscriber.selector';
import { SubscribersEffects } from './state/subscriber.effects';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { BadgeOrderListComponent } from './badge-order-list/badge-order-list.component';
import { RouterModule } from '@angular/router';
import { OrdersModule } from '../orders/orders.module';

@NgModule({
  declarations: [
    AddSubscribersComponent,
    UpdateSubscribersComponent,
    TableSubscribersComponent,
    OrdersListComponent,
    BadgeOrderListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrdersModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatListModule,
    MatTabsModule,
    MatSortModule,
    MatMenuModule,
    MatTooltipModule,
    MatBadgeModule,
    RouterModule,
    RouterModule,
    NgxMaskModule.forRoot({ showMaskTyped: true }),
    StoreModule.forFeature(SUBSCRIBER_STATE_NAME, subscriberReducer),
    EffectsModule.forFeature([SubscribersEffects]),
  ],
  exports: [
    TableSubscribersComponent
  ]
})
export class SubscribersModule { }
