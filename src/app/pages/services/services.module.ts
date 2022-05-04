import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableServicesComponent } from './table-services/table-services.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SERVICE_STATE_NAME } from './state/service.selector';
import { servicesReducer } from './state/service.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ServicesEffects } from './state/service.effects';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddServiceComponent } from './add-service/add-service.component';
import { UpdateServiceComponent } from './update-service/update-service.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    TableServicesComponent,
    AddServiceComponent,
    UpdateServiceComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSortModule,
    MatMenuModule,
    MatTooltipModule,
    RouterModule,
    StoreModule.forFeature(SERVICE_STATE_NAME, servicesReducer),
    EffectsModule.forFeature([ServicesEffects]),
  ],
  exports: [
    TableServicesComponent,
  ]
})
export class ServicesModule { }
