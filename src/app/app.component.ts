import { Component } from '@angular/core';
import { LoginService } from './login-page/login-page.service';
import { Role } from './login-page/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'logistic-company-ui';
}
