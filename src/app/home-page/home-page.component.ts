import { Component } from '@angular/core';
import { LoginService } from '../login-page/login-page.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Role } from '../login-page/user';
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css', '/src/styles.css']
})
export class HomePageComponent {
  public username = '';

  constructor(public loginService: LoginService) {}

  public logout(): void {
    this.loginService.logout();
  }

  public get role(): typeof Role {
    return Role;
  }

}
