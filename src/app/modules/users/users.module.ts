import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UsersRoutingComponents, UsersRoutingModule } from './users.router';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersRoutingComponents,
    UserSettingsComponent
  ]
})
export class UsersModule { }
