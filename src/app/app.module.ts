import { Http } from '@angular/http';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Lang l18n
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

// material-desing-lite
import { MdlModule } from 'angular2-mdl';
import { MdlSelectModule } from '@angular2-mdl-ext/select';
import { MdlPopoverModule } from '@angular2-mdl-ext/popover';
import { MdlExpansionPanelModule } from '@angular2-mdl-ext/expansion-panel';

// Firebase Api
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './services/auth/auth.config';

// Chart.js
import { ChartModule } from 'angular2-chartjs';

// Custom imports
import { AppComponent } from './components/app/app.component';
import { AppRoutingModule, routingComponents } from './app.router';
import { AuthService } from './services/auth/auth.service';
import { AuthComponent } from './components/auth/auth.component';
import { AuthWidgetComponent } from './components/auth-widget/auth-widget.component';
import { LangWidgetComponent } from './components/lang-widget/lang-widget.component';

export function customTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AuthComponent,
    AuthWidgetComponent,
    LangWidgetComponent,
    routingComponents,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (customTranslateLoader),
      deps: [Http]
    }),
    MdlModule,
    MdlSelectModule,
    MdlPopoverModule,
    MdlExpansionPanelModule,
  ],
  providers: [ AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
