import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'auth-widget',
  templateUrl: './auth-widget.component.html',
  styleUrls: ['./auth-widget.component.sass']
})

export class AuthWidgetComponent {

  constructor(public AuthService: AuthService, private router: Router) { }
}
