import { Component, OnInit } from '@angular/core';
import { Company } from './company';
import { CompanyService } from './company.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css', '/src/styles.css']
})
export class CompanyComponent implements OnInit {
  company: Company;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.pipe(
      switchMap((params: Params) => {
        if (isEmpty(params)) {
          return of();
        }
        return this.companyService.getCompany(params["name"])
      })
    ).subscribe({
      next: company => this.company = company,
    })
  }
}
