import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { EmailValidators } from 'ng2-validators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {

  // Login form
  public LoginForm: FormGroup;
  public l_email = new FormControl('', [Validators.required,  EmailValidators.normal()]);
  public l_password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*\d).{4,32}$')]);

  // Sign In form
  public SigninForm: FormGroup;
  public s_fullname = new FormControl('', [Validators.required, Validators.maxLength(32)]);
  public s_email = new FormControl('', [Validators.required,  EmailValidators.normal()]);
  public s_password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*\d).{4,32}$')]);

  constructor(public AuthService: AuthService, public fb: FormBuilder) {
    this.LoginForm = fb.group({
      email: this.l_email,
      password: this.l_password,
    });
    this.SigninForm = fb.group({
      fullname: this.s_fullname,
      email: this.s_email,
      password: this.s_password,
    });
  }

  submitLogin() {
   let data = this.LoginForm.value;
   this.AuthService.emailLogin(data.email, data.password);
  }
  submitSignin() {
   let data = this.SigninForm.value;
   this.AuthService.register(data.fullname, data.email, data.password);
  }

}
