import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Office } from './office';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(private http: HttpClient) { }

  public getOffices(companyId: number): Observable<Office[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Office[]>(
       'http://localhost:3000/offices?company=' + companyId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getOffice(id: number): Observable<Office> {
    return this.http.get<Office>(
       'http://localhost:3000/office?id=' + id,
    )
  }

  public createOffice(name: string, address: string, contact: string, info: string, companyId: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/create-office',
      {name: name, address: address, contact: contact, info: info, companyId: companyId},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public updateOffice(id: number, name: string, address: string, contact: string, info: string) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/update-office',
      {id: id, name: name, address: address, contact: contact, info: info},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public removeOffice(id: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/remove-office',
      {id: id},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }
}
