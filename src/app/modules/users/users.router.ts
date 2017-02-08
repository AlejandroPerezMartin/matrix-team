import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { LoginComponent }  from './components/login/login.component';
import { UserSettingsComponent }  from './components/user-settings/user-settings.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/user/profile' },
      { path: 'profile', component: LoginComponent, canActivate: [AuthGuard] }, // TODO: Change to valid one
      { path: 'settings', component: UserSettingsComponent, canActivate: [AuthGuard] }, // TODO: Change to valid one
      { path: 'login', component: LoginComponent },
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

export const UsersRoutingComponents = [LoginComponent, UserSettingsComponent];
