import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { AppRoutingModule, RoutingComponents } from './app.router';
import { AppComponent } from './components/app/app.component';
import { AuthWidgetComponent } from './components/auth-widget/auth-widget.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LangWidgetComponent } from './components/lang-widget/lang-widget.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminModule } from './modules/admin/admin.module';
import { SharedModule } from './modules/shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { HomeComponentComponent } from './components/home-component/home-component.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthWidgetComponent,
    LangWidgetComponent,
    DashboardComponent,
    RoutingComponents,
    NotFoundComponent,
    HomeComponentComponent
  ],
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AdminModule,
    UsersModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
