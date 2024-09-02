import { Component, Input, OnInit } from '@angular/core';
import { Package } from './package';
import { NgForm } from '@angular/forms';
import { UserService } from '../login-page/user.service';
import { OfficeService } from '../office/office.service';
import { PackageService } from './package.service';


const TAX_FUEL_OFFICE =  0.13;
const TAX_FUEL_ADDRESS =  0.23;
const TAX_SERVICE =  0.13;

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css', '/src/styles.css']
})

export class PackageComponent implements OnInit {
  @Input() companyId: number;
  packages: Package[];
  error = '';
  currentEditPackage: Package = null;
  editPackageMode = false;
  createPackageMode = false;

  constructor(
    private packageService: PackageService,
    private userService: UserService,
    private officeService: OfficeService,
  ) { }

  ngOnInit(): void {
    this.getPackages();
  }

  public getPackages(): void {
    this.packageService.getPackages(this.companyId).subscribe(
      packages => this.packages = packages
    );
  }

  public edit(p: Package): void {
    this.editPackageMode = true;
    this.currentEditPackage = p;
  }

  public delete(packageId: number): void {
    this.packageService.removePackage(packageId).subscribe(() => this.getPackages());
  }

  public editPackage(form: NgForm, packageId: number): void {
    this.packageService.updatePackage(
      packageId,
      form.value.packageRecipient,
      form.value.packageOfficeWorkerId,
      form.value.packageCourierId,
      form.value.packageAddress,
      form.value.packageOffice,
      form.value.packageReceivedDate,
    ).subscribe({
      next: () => this.getPackages(),
      error: err => this.error = err
    })
    form.reset();
    this.editPackageMode = false;
  }

  public createPackageForm(form: NgForm): void {
    // calculate price
    this.packageService.createPackage(
        form.value.packageCompanyId,
        form.value.packageSenderId,
        form.value.packageRecipient,
        form.value.packageWeight,
        // form.value.packageprice,
        form.value.packageOfficeWorkerId,
        form.value.packageCourierId,
        form.value.packageSentDate,
        form.value.packageAddress,
        form.value.packageOffice,
        form.value.packageReceivedDate,
        ).subscribe({
      next: () => {
        this.getPackages()
        form.reset();
        this.createPackageMode = false;
      },
      error: err => this.error = err
    })
  }

  public calculatePrice(weight: number): number {
    return weight * TAX_FUEL_ADDRESS
  }

  public cancelPackageCreation(): void {
    this.createPackageMode = false;
  }
}
