import { Component, Input } from '@angular/core';
import { Office } from './office';
import { LoginService } from '../login-page/login-page.service';
import { UserService } from '../login-page/user.service';
import { OfficeService } from './office.service';
import { Role } from '../login-page/user';
import { NgForm } from '@angular/forms';
import { switchMap, of } from 'rxjs';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent {
  @Input() companyId: number;
  offices: Office[];
  editOfficeMode = false;
  createOfficeMode = false;
  currentEditOffice: Office = null;
  userRole: string;
  error: string;

  constructor(
    private officeService: OfficeService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.userRole = Role[this.loginService.user.value.role]
    this.getOffices();
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
