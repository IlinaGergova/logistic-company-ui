import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../login-page/user';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public getEmployees(companyId: number): Observable<Employee[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Employee[]>(
       'http://localhost:3000/employees?companyId=' + companyId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getEmployeesByPosition(companyId: number, position: Position): Observable<Employee[]> {
    const params = new HttpParams().append('companyId', companyId).append('position', position);

    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Employee[]>(
       'http://localhost:3000/employees-by-position',
       {headers: {"Authorization": "Bearer " + token}, params}
    )
  }

  public getEmployeesByOffice(officeId: number): Observable<Employee[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Employee[]>(
       'http://localhost:3000/employees-by-office?officeId=' + officeId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(
       'http://localhost:3000/employee?id=' + id,
    )
  }

  public createEmployee(name: string, address: string, contact: string, position: Position, companyId: number, officeId: number, userId: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/create-employee',
      {name: name, address: address, contact: contact, position: position, companyId: companyId, userId: userId, officeId: officeId},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public updateEmployee(id: number, name: string, address: string, contact: string, officeId: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/update-employee',
      {id: id, name: name, address: address, contact: contact, officeId: officeId},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public removeEmployee(id: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/remove-employee',
      {id: id},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }
}
