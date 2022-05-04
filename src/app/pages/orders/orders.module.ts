import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOrdersComponent } from './table-orders/table-orders.component';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { UpdateOrdersComponent } from './update-orders/update-orders.component';
import { InfoOrdersComponent } from './info-orders/info-orders.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from './state/order.effects';
import { ORDER_STATE_NAME } from './state/order.selector';
import { ordersReducer } from './state/order.reducer';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { UsersOrdersComponent } from './users-orders/users-orders.component';

@NgModule({
  declarations: [
    TableOrdersComponent,
    AddOrdersComponent,
    UpdateOrdersComponent,
    InfoOrdersComponent,
    UsersOrdersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSelectModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatListModule,
    MatTooltipModule,
    RouterModule,
    StoreModule.forFeature(ORDER_STATE_NAME, ordersReducer),
    EffectsModule.forFeature([OrderEffects]),
  ],
  exports: [
    TableOrdersComponent,
    InfoOrdersComponent,
    UsersOrdersComponent
  ]
})
export class OrdersModule { }
