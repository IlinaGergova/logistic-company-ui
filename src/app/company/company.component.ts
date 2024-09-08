import { Component, OnInit } from '@angular/core';
import { Company } from './company';
import { CompanyService } from './company.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { isEmpty } from 'lodash';
import { UserService } from '../login-page/user.service';
import { LoginService } from '../login-page/login-page.service';
import { Role } from '../login-page/user';
import { Client } from '../client/client';
import { Employee } from '../employee/employee';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company: Company;
  userDetails: Employee | Client;

  constructor(
    private companyService: CompanyService,
    private loginService: LoginService,
    private userSerivce: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        if (isEmpty(params)) {
          return of();
        }
        return this.companyService.getCompanyById(params["id"])
      })
    ).subscribe({
      next: company => this.company = company,
    })

    const user = this.loginService.user.getValue();
    if (user.role === Role.Employee) {
      this.userSerivce.getEmployeeByUser(user.id).subscribe(employee => this.userDetails = employee);
    }
    else if (user.role === Role.Client) {
      this.userSerivce.getClientByUser(user.id).subscribe(client => this.userDetails = client);
    }
  }
}
