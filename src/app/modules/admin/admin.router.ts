import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guards/admin.guard';
import { AdminComponent }  from './components/admin/admin.component';
import { AdminDashboardComponent }  from './components/admin-dashboard/admin-dashboard.component';
import { AdminTeamsComponent }  from './components/admin-teams/admin-teams.component';
import { AdminStaffComponent }  from './components/admin-staff/admin-staff.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
     { path: '', component: AdminComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: '/admin/dashboard' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'teams', component: AdminTeamsComponent },
      { path: 'staff', component: AdminStaffComponent },
     ]}
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
