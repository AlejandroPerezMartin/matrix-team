import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingComponents, AdminRoutingModule } from './admin.router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminStaffComponent } from './components/admin-staff/admin-staff.component';
import { AdminTeamsComponent } from './components/admin-teams/admin-teams.component';

@NgModule({
  declarations: [
    AdminRoutingComponents
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
