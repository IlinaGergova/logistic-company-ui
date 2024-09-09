import { Component } from '@angular/core';
import { LoginService } from '../login-page/login-page.service';
import { Role } from '../login-page/user';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  public username = '';

  constructor(public loginService: LoginService) {}

  public logout(): void {
    this.loginService.logout();
  }

  public get role(): typeof Role {
    return Role;
  }

}
