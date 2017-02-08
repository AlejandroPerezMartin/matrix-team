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

// Custom Services
import { AuthService } from './services/auth/auth.service';

// Custom Modules
import { AppRoutingModule, RoutingComponents } from './app.router';
import { AdminModule } from './modules/admin/admin.module';
import { UsersModule } from './modules/users/users.module';

// Custom Components
import { AppComponent } from './components/app/app.component';
import { AuthWidgetComponent } from './components/auth-widget/auth-widget.component';
import { LangWidgetComponent } from './components/lang-widget/lang-widget.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export function customTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthWidgetComponent,
    LangWidgetComponent,
    DashboardComponent,
    RoutingComponents,
    NotFoundComponent,
  ],
  imports: [
    // Core modules
    BrowserModule,
    HttpModule,
    MdlModule,
    MdlSelectModule,
    MdlPopoverModule,
    MdlExpansionPanelModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (customTranslateLoader),
      deps: [Http]
    }),
    // Forms Modules
    FormsModule,
    ReactiveFormsModule,
    // Custom Modules
    AdminModule,
    UsersModule,
    AppRoutingModule, // Must be the last one so '**' can be implemented
  ],
  providers: [ AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
