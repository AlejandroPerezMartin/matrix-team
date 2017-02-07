import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [ ]
})
export class AppRoutingModule { }

export const routingComponents = [ AuthComponent ];
