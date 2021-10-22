import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreModule} from '@ngrx/store';
import {reducers} from './index';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/auth.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Leirem',
      maxAge: 25,
      logOnly: environment.production
    })
  ]
})
export class StateModule { }
