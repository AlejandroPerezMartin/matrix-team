import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private af: AngularFire, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.af.auth
      .take(1)
      .map((authState: FirebaseAuthState) => !!authState)
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/user/login']);
        }
      });
  }
}
