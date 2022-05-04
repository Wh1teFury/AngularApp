import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSubscribersComponent } from './components/info-subscribers/info-subscribers.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { ActivityPipe, HighlighterPipe, SliceTextPipe, TelPipe } from './pipes.pipe';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AUTH_STATE_NAME } from './state/auth.selector';
import { authReducer } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';



@NgModule({
  declarations: [
    InfoSubscribersComponent,
    ActivityPipe,
    HighlighterPipe,
    SliceTextPipe,
    TelPipe,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    StoreModule.forFeature(AUTH_STATE_NAME, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [
    InfoSubscribersComponent,
    HighlighterPipe,
    ActivityPipe,
    SliceTextPipe,
    TelPipe
  ]
})
export class SharedModule { }
