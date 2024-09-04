import { Component, Input, OnInit } from '@angular/core';
import { CompanyService } from '../company/company.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../company/company';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public error = '';
  public companies: Company[] = [];
  public createMode = false;
  public editMode = false;
  public currentEditCompany: Company = null;

  constructor(public companiesService: CompanyService, public router: Router) {}


  public ngOnInit(): void {
    this.getCompanies();
  }

  public getCompanies(): void {
    this.companiesService.getCompanies().subscribe(
      companies => this.companies = companies
    );
  }

  public createCompany(form: NgForm): void {
    this.companiesService.createCompany(form.value.companyName, form.value.companyAddress, form.value.companyContact).subscribe({
      next: res => this.getCompanies(),
      error: err => this.error = err
    })
    form.reset();
    this.createMode = false;
  }

  public editCompany(form: NgForm, companyId: number): void {
    this.companiesService.updateCompany(companyId, form.value.companyName, form.value.companyAddress, form.value.companyContact).subscribe({
      next: res => this.getCompanies(),
      error: err => this.error = err
    })
    this.editMode = false;
  }

  public cancelCreation(): void {
    this.createMode = false;
  }

  public remove(id: number): void {
    this.companiesService.removeCompany(id).subscribe(() => this.getCompanies());
  }

  public edit(company: Company): void {
    this.editMode = true;
    this.currentEditCompany = company;
  }

}
