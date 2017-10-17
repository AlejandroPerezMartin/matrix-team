import { MdlDialogService } from '@angular-mdl/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'auth-widget',
  templateUrl: './auth-widget.component.html',
  styleUrls: ['./auth-widget.component.scss']
})

export class AuthWidgetComponent {
  private default_user_status = { status: false };

  user: firebase.User;

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService,
    private dialogService: MdlDialogService,
    private router: Router
  ) {
    this.authService.userObservable.subscribe(user => this.user = user);
  }

  login() {
    this.authService.googleLogin().then(auth => {
      console.log(auth);
      if (!auth) {
        this.authService.logout();
        this.dialogService.alert('Invalid @emergya.com email', 'Close', 'Sorry...');
      }
    });
  }

}
