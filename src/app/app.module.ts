import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AuthEffects} from './state/auth/auth.effects';
import {CoreModule} from './core/core.module';
import {ContentLayoutComponent} from './layout/content-layout/content-layout.component';
import {SharedModule} from './shared/shared.module';
import {FooterComponent} from './layout/footer/footer.component';
import {StateModule} from './state/store.module';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        ContentLayoutComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        AppRoutingModule,
        StateModule,
        EffectsModule.forRoot([AuthEffects]),
        StoreDevtoolsModule.instrument({
            name: 'Leirem',
            maxAge: 25,
            logOnly: environment.production
        })
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
