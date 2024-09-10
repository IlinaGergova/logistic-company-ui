import { Component, OnInit } from '@angular/core';
import { Company } from './company';
import { CompanyService } from './company.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { isEmpty } from 'lodash';
import { UserService } from '../login-page/user.service';
import { LoginService } from '../login-page/login-page.service';
import { Position, Role } from '../login-page/user';
import { Client } from '../client/client';
import { Employee } from '../employee/employee';
import { Office } from '../office/office';
import { NgForm } from '@angular/forms';
import { ClientService } from '../client/client.service';
import { EmployeeService } from '../employee/employee.service';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company: Company;
  userDetails: Employee | Client;
  office: Office;
  position: string;
  editUserMode = false;
  income = -1;

  constructor(
    private companyService: CompanyService,
    private loginService: LoginService,
    private userSerivce: UserService,
    private clientService: ClientService,
    private employeeService: EmployeeService,
    private orderService: OrderService,
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

    this.getUser();
  }

  public getUser(): void {
    const user = this.loginService.user.getValue();
    if (user.role === Role.Employee) {
      this.userSerivce.getEmployeeByUser(user.id).subscribe(employee => this.userDetails = employee);
    }
    else if (user.role === Role.Client) {
      this.userSerivce.getClientByUser(user.id).subscribe(client => this.userDetails = client);
    }
  }

  public getEmployeeVisibility(): boolean {
    return !this.userDetails; // Admins have no details
  }

  public getClientVisibility(): boolean {
    return !this.userDetails || 'position' in this.userDetails
  }

  public isEmployee(): boolean {
    if(this.userDetails && 'position' in this.userDetails) {
      this.office = this.userDetails.office;
      this.position = Position[this.userDetails.position];
      return true;
    }
    return false;
  }

  public isCourier(): boolean {
    if(this.userDetails
      && 'position' in this.userDetails
      && !('office' in this.userDetails)
    ) {
      return true;
    }
    return false;
  }

  public editUser(form: NgForm): void {
    if(this.isEmployee()) {
      this.employeeService.updateEmployee(
        (this.userDetails as Employee).id,
        form.value.userName,
        form.value.userAddress,
        form.value.userContact,
        (this.userDetails as Employee).office.id
      ).subscribe({
        next: () => this.getUser(),
      })
    } else {
      this.clientService.updateClient(
        (this.userDetails as Client).id,
        form.value.userName,
        form.value.userAddress,
        form.value.userContact,
      ).subscribe({
        next: () => this.getUser(),
      })
    }
    
    form.reset();
    this.editUserMode = false;
  }

  public calculate(form: NgForm): void {
    this.orderService.getIncomeForPeriod(this.company.id, form.value.from, form.value.to).subscribe(
      res => this.income = res
    )
  }
}
