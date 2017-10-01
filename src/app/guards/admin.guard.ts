import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): Observable<boolean> {

    return this.authService.userObservable
      .take(1)
      .map(user => (user && this.authService.isAdmin))
      .first();
  }

}
