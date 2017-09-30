import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

  private _user: firebase.User;
  private _adminsList: string[] = [];
  private _isAdmin = false;

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
  ) {
    this.afAuth.authState
      .map(user => this.user = user)
      .switchMap(() => this.db.object(`/roles/admin/`))
      .subscribe(list => {
        this._adminsList = Object.keys(list);
        this.adminCheck();
      });
  }

  get user(): firebase.User {
    return this._user;
  }

  get userObservable(): any {
    return this.afAuth.authState;
  }

  set user(value: firebase.User) {
    this._user = value;
  }

  get isAuthenticated(): boolean {
    return this._user !== null;
  }

  get id(): string {
    return this.isAuthenticated ? this.user.uid : '';
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }

  private adminCheck() {
    this._isAdmin = this.user && this._adminsList.includes(this.user.uid);
  }

googleLogin() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        return this.db.object(`/users/${response.user.uid}`)
          .subscribe(user => {
            if (!user.$exists() && response.user.email.includes('emergya.com')) {

              const { displayName, email, emailVerified, photoURL, uid } = response.user;

              this.db.object(`/users/${response.user.uid}`).set({
                displayName,
                email,
                emailVerified,
                photoURL,
                uid
              });

              this.user = response.user;

              return user;
            }
            return false;
          });
      })
      .catch(err => Observable.throw(err));
  }

  logout() {
    return this.afAuth.auth.signOut().then(() => this.router.navigate(['/']));
  }

}
