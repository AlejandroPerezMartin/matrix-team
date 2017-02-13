import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { MdlDialogService } from 'angular2-mdl';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'auth-widget',
  templateUrl: './auth-widget.component.html',
  styleUrls: ['./auth-widget.component.sass']
})

export class AuthWidgetComponent {
  private default_user_status = { status: false };

  constructor(
    public af: AngularFire,
    public AuthService: AuthService,
    private dialogService: MdlDialogService,
    private router: Router
  ) { }

  login() {
    this.AuthService.googleLogin().then(auth => {
      if (auth.auth.email.indexOf('emergya.com') > -1 && auth.auth.emailVerified) {
        this.save();
      } else {
        this.AuthService.logout();
        this.dialogService.alert('Invalid EMERGYA email', 'OK', 'Sorry!');
      }
    });
  }

  private save() {
    let data = this.af.database.object('/users/' + this.AuthService.user.uid, { preserveSnapshot: true });
    data.subscribe(result => {
      if (!result.exists()) {
        data.set(this.default_user_status).then(_ => this.dialogService.alert('New User created', 'OK', 'Wiiii!'));
      }
    });
  }
}
