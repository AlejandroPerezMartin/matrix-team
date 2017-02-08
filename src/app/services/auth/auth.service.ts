import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MdlDialogService } from 'angular2-mdl';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';
import { FIREBASE_AUTH_ANONYMOUS, FIREBASE_AUTH_EMAIL, FIREBASE_AUTH_GOOGLE } from './auth.config';

@Injectable()
export class AuthService {
  public user: any;
  public is_admin = false;
  public redirectUrl: string;
  private admin_list;

  constructor(public af: AngularFire, private router: Router, private dialogService: MdlDialogService) {
    this.af.database.object(`/roles/admin/`).subscribe(list => {
      this.admin_list = list;
      this.adminCheck();
    });
    this.af.auth.subscribe(auth => {
      this.user = auth;
      this.adminCheck();
    });
  }

  private adminCheck() {
    if (this.user != null && this.admin_list != null) {
      if (this.admin_list[this.user.uid] !== undefined) {
        this.is_admin = true;
      } else {
        this.is_admin = false;
      }
    }
  }

  register(displayName: string, email: string, password: string) {
    // *********************** CREATE START *********************
    this.af.auth.createUser({ email: email, password: password })
      .then((success) => {
        // *********************** LOGIN START *********************
        this.af.auth.login({
          email: email,
          password: password,
        }, FIREBASE_AUTH_EMAIL).then((data) => {
          // *********************** PROFILE UPDATE START *********************
          this.user.auth.updateProfile({
            displayName: displayName,
            photoURL: 'https://www.gravatar.com/avatar/' + Md5.hashStr(email) + '?s=45'
          }).then((success) => {
            this.redirect();
          }).catch((error) => {
            this.dialogService.alert(error.message, 'OK', 'Sorry');
          });
          // *********************** PROFILE UPDATE END ***********************
        }).catch((error) => {
          this.dialogService.alert(error.message, 'OK', 'Sorry');
        });
        // *********************** LOGIN END ***********************
      }).catch((error) => {
        this.dialogService.alert(error.message, 'OK', 'Sorry');
      });
    // *********************** CREATE END ***********************
  };

  anonymousLogin() {
    return this.af.auth.login(FIREBASE_AUTH_ANONYMOUS).then((data) => {
      this.redirect();
    });
  };
  googleLogin() {
    this.af.auth.login(FIREBASE_AUTH_GOOGLE).then((data) => {
      this.redirect();
    });
  };
  emailLogin(email: string, pass: string) {
    return this.af.auth.login({
      email: email,
      password: pass,
    }, FIREBASE_AUTH_EMAIL).then((data) => {
      this.redirect();
    });
  };

  logout(): Promise<void> {
    return this.af.auth.logout();
  }

  isAuthenticated(): boolean {
    if (this.user != null) {
      return true;
    } else {
      return false;
    }
  }

  saveRoute() {
    this.redirectUrl = this.router.url;
  }

  redirect(): void {
    if (this.redirectUrl !== undefined) {
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = undefined;
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
