import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../../guards/admin.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminStaffComponent } from './components/admin-staff/admin-staff.component';
import { AdminTeamsComponent } from './components/admin-teams/admin-teams.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      {
        path: '', component: AdminComponent, children: [
          { path: '', pathMatch: 'full', redirectTo: '/admin/dashboard' },
          { path: 'dashboard', component: AdminDashboardComponent },
          { path: 'teams', component: AdminTeamsComponent },
          { path: 'staff', component: AdminStaffComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ],
  providers: [ AdminGuard ]
})
export class AdminRoutingModule { }

export const AdminRoutingComponents = [AdminComponent, AdminDashboardComponent, AdminTeamsComponent, AdminStaffComponent];
