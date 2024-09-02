import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from './login-page.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { Role, User } from './user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  public error = '';
  public user: User = null;

  constructor(
    public loginService: LoginService,
    public router: Router,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
      this.loginService.autoLogin();
  }

  public login(form: NgForm): void{
    this.loginService.login(form.value.username, form.value.password).subscribe(res => {
      this.user = res;
      switch(this.user.role) {
        case Role.Admin: {
          this.router.navigate(['/home']);
          break;
        }
        case Role.Client: {
          this.userService.getClientByUser(this.user.id).subscribe(client => this.router.navigate(['client/' + client.id]))
          break;
        }
        case Role.Employee: {
          this.userService.getEmployeeByUser(this.user.id).subscribe(worker => this.router.navigate(['employee-profile/' + worker.id]))
          break;
        }
        case Role.Courier: {
          this.userService.getCourierByUser(this.user.id).subscribe(courier => this.router.navigate(['courier-profile/' + courier.id]))
          break;
        }
        default: {
          this.router.navigate(['']);
          break;
        }
    }
    },
      error => this.error = error);
    form.reset();
  }
}
