import { Component, Input, OnInit } from '@angular/core';
import { Employee } from './employee';
import { NgForm } from '@angular/forms';
import { switchMap, of, combineLatest } from 'rxjs';
import { LoginService } from '../login-page/login-page.service';
import { Position, Role } from '../login-page/user';
import { UserService } from '../login-page/user.service';
import { EmployeeService } from './employee.service';
import { Office } from '../office/office';
import { OfficeService } from '../office/office.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() companyId: number;
  employees: Employee[];
  error = '';
  editEmployeeMode = false;
  createEmployeeMode = false;
  currentEditEmployee: Employee = null;
  offices: Office[];
  selectedPosition: string = '';

  constructor(
    private employeeService: EmployeeService,
    private userService: UserService,
    private officeService: OfficeService,
  ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getOffices();
  }

  public get positions(): (string | Position)[] {
    return Object.getOwnPropertyNames(Position).filter(val => isNaN(parseInt(val)));
  }

  public getOffices(): void {
    this.officeService.getOffices(this.companyId).subscribe(
      offices => this.offices = offices
    );
  }

  public getEmployees(): void {
    this.employeeService.getEmployees(this.companyId).subscribe(
      employees => this.employees = employees
    );
  }

  public edit(employee: Employee): void {
    this.editEmployeeMode = true;
    this.currentEditEmployee = employee;
  }

  public delete(employeeId: number): void {
    this.employeeService.removeEmployee(employeeId).subscribe(() => this.getEmployees());
  }

  public editEmployee(form: NgForm, employeeId: number): void {
    this.employeeService.updateEmployee(
      employeeId,
      form.value.employeeName,
      form.value.employeeAddress,
      form.value.employeeContact,
      form.value.employeeOffice,
    ).subscribe({
      next: () => this.getEmployees(),
      error: err => this.error = err
    })
    form.reset();
    this.editEmployeeMode = false;
  }

  public createEmployeeForm(form: NgForm): void {
    let office = form.value.employeeOffice;
    if(this.selectedPosition === 'Courier') {
      office = null;
    }
    this.userService.createUser(
      Role.Employee,
      form.value.employeeUsername,
      form.value.employeePassword,
    ).pipe(
      switchMap((userId: number) => {
        if (!userId) {
          return of();
        }
        return this.employeeService.createEmployee(
          form.value.employeeName,
          form.value.employeeAddress,
          form.value.employeeContact,
          parseInt(Position[form.value.employeePosition]),
          this.companyId,
          office,
          userId,
        )
      })
    ).subscribe({
      next: () => {
        this.getEmployees()
        form.reset();
        this.createEmployeeMode = false;
        this.selectedPosition = '';
      },
      error: err => this.error = err
    })
  }

  public openForm(): void {
    this.getOffices();
    this.createEmployeeMode = true
  }

  public cancelEmployeeCreation(): void {
    this.createEmployeeMode = false;
    this.selectedPosition = '';
  }
}
