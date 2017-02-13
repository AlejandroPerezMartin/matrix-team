import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { UserSettingsComponent }  from './components/user-settings/user-settings.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/user/profile' },
      { path: 'profile', component: UserSettingsComponent, canActivate: [AuthGuard] },
      { path: 'settings', component: UserSettingsComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class UsersRoutingModule { }

export const UsersRoutingComponents = [UserSettingsComponent];
