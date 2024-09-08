import { Component, Input } from '@angular/core';
import { Office } from './office';
import { LoginService } from '../login-page/login-page.service';
import { UserService } from '../login-page/user.service';
import { OfficeService } from './office.service';
import { Position, Role } from '../login-page/user';
import { NgForm } from '@angular/forms';
import { switchMap, of } from 'rxjs';
import { Employee } from '../employee/employee';
import { Client } from '../client/client';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent {
  @Input() companyId: number;
  @Input() userDetails: Employee | Client;
  offices: Office[];
  editOfficeMode = false;
  createOfficeMode = false;
  currentEditOffice: Office = null;
  error: string;

  constructor(
    private officeService: OfficeService,
  ) { }

  ngOnInit(): void {
    this.getOffices();
  }

  public hasAccess(): boolean {
    if(!this.userDetails)  { // Admin
      return true;
    }
    if (!('position' in this.userDetails) // Excluded
      || ('position' in this.userDetails && this.userDetails.position === Position.Courier)){
      return false;
    }
    return true; // For all else
  }

  public getOffices(): void {
    this.officeService.getOffices(this.companyId).subscribe(
      offices => this.offices = offices
    );
  }

  public edit(office: Office): void {
    this.editOfficeMode = true;
    this.currentEditOffice = office;
  }

  public delete(officeId: number): void {
    this.officeService.removeOffice(officeId).subscribe(() => this.getOffices());
  }

  public editOfficeForm(form: NgForm, officeId: number): void {
    this.officeService.updateOffice(
      officeId,
      form.value.officeName,
      form.value.officeAddress,
      form.value.officeContact,
      form.value.officeInfo,
    ).subscribe({
      next: () => this.getOffices(),
      error: err => this.error = err
    })
    form.reset();
    this.editOfficeMode = false;
  }

  public createOfficeForm(form: NgForm): void {
   this.officeService.createOffice(
          form.value.officeName,
          form.value.officeAddress,
          form.value.officeContact,
          form.value.officeInfo,
          this.companyId,
    ).subscribe({
      next: () => {
        this.getOffices()
        form.reset();
        this.createOfficeMode = false;
      },
      error: err => this.error = err
    })
  }

  public cancelOfficeCreation(): void {
    this.editOfficeMode = false;
  }
}
