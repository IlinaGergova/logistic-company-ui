import { Component } from '@angular/core';
import { LoginService } from '../login-page/login-page.service';
import { Role } from '../login-page/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public username = '';

  constructor(public loginService: LoginService) {}

  public logout(): void {
    this.loginService.logout();
  }

  public get role(): typeof Role {
    return Role;
  }
}
