import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {}

  public getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(
       'http://localhost:3000/company-by-id?id=' + id,
    )
  }

  public getCompany(name: string): Observable<Company> {
    return this.http.get<Company>(
       'http://localhost:3000/company?name=' + name,
    )
  }

  public getCompanies(): Observable<Company[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')!).token;
    return this.http.get<Company[]>(
       'http://localhost:3000/companies',
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public createCompany(name: string, address: string, contact: string) {
    const token: string = JSON.parse(localStorage.getItem('userData')!).token;
    return this.http.post(
      'http://localhost:3000/create-company',
      {name: name, address: address, contact: contact},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public updateCompany(id: number, name: string, address: string, contact: string) {
    const token: string = JSON.parse(localStorage.getItem('userData')!).token;
    return this.http.post(
      'http://localhost:3000/update-company',
      {id: id, name: name, address: address, contact: contact},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public removeCompany(id: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')!).token;
    return this.http.post(
      'http://localhost:3000/remove-company',
      {id: id},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }
}
