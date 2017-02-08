import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../services/auth/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private af: AngularFire,
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    let redirectURL: string = state.url;

    return this.af.auth
      .flatMap(auth => {
        if (auth == null) {
          return new Promise(resolve => { resolve({}); });
        } else {
          return this.af.database.object(`/roles/admin/${auth.uid}`);
        }
      })
      .map(data => {
        if (data.$value) {
          return true;
        } else {
          // User doesn't have permission
          this.authService.redirectUrl = redirectURL;
          this.router.navigate(['/']);
          return false;
        }
      })
      .first();

  }

}
