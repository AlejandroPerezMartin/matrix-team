import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';

import { MdlModule } from 'angular2-mdl';
import { AdminRoutingModule, AdminRoutingComponents } from './admin.router';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminTeamsComponent } from './components/admin-teams/admin-teams.component';
import { AdminStaffComponent } from './components/admin-staff/admin-staff.component';

export function customTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    MdlModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (customTranslateLoader),
      deps: [Http]
    }),
    AdminRoutingModule,
  ],
  declarations: [ AdminRoutingComponents, AdminDashboardComponent, AdminTeamsComponent, AdminStaffComponent ]
})
export class AdminModule { }
