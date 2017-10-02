import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  public skills: Array<Object> = [
    { name: 'php', title: 'PHP' },
    { name: 'symfony', title: 'Symfony' },
    { name: 'symfony2', title: 'Symfony 2' },
    { name: 'drupal7', title: 'Drupal 7' },
    { name: 'drupal8', title: 'Drupal 8' },
    { name: 'javascript', title: 'JavaScript' },
    { name: 'angular', title: 'Angular' },
    { name: 'angularjs', title: 'AngularJs' },
    { name: 'ionic', title: 'Ionic' },
    { name: 'ionic2', title: 'Ionic 2' },
    { name: 'c', title: 'c' },
    { name: 'c++', title: 'C++' },
    { name: 'c#', title: 'C#' },
    { name: '.net', title: '.NET' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
