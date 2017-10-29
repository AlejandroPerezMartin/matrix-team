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
      .switchMap(() => this.db.object(`/roles/admin/`).valueChanges())
      .subscribe(list => {
        this._adminsList = Object.keys(list);
        this.adminCheck();
      });
  }

  get user(): firebase.User {
    return this._user;
  }

  get userObservable(): Observable<firebase.User> {
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

  private adminCheck(): void {
    this._isAdmin = this.user && this._adminsList.includes(this.user.uid);
  }

  googleLogin() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        return this.db.object(`/users/${response.user.uid}`).valueChanges()
          .subscribe(user => {

            if (!response.user.email.includes('emergya.com')) {
              this.logout();
              return false;
            } else {

              if (!user) {
                const { displayName, email, emailVerified, photoURL, uid } = response.user;

                this.db.object(`/users/${response.user.uid}`).set({
                  displayName,
                  email,
                  emailVerified,
                  photoURL,
                  uid
                });
              }

              this.user = response.user;
              return response.user;
            }
          });
      })
      .catch(err => Observable.throw(err));
  }

  logout() {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['/']));
  }

}
