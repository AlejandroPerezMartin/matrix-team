import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';

import { MdlModule } from 'angular2-mdl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule, UsersRoutingComponents } from './users.router';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

export function customTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MdlModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (customTranslateLoader),
      deps: [Http]
    }),
  ],
  declarations: [ UsersRoutingComponents, UserSettingsComponent ]
})
export class UsersModule { }
