import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './user';
import { Observable } from 'rxjs';
import { Client } from '../client/client';
import { Courier } from '../courier/courier';
import { Employee } from '../employee/employee';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {}

  public createUser(role: Role, username: string, password: string) {
    const token: string = JSON.parse(localStorage.getItem('userData')!).token;
    return this.http.post<number>(
      'http://localhost:3000/create-user',
      {role: role, username: username, password: password},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getClientByUser(userId: number): Observable<Client> {
    const token: string = JSON.parse(localStorage.getItem('userData')!).token;
    return this.http.get<Client>(
       'http://localhost:3000/client-by-user?user=' + userId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getEmployeeByUser(userId: number): Observable<Employee> {
    const token: string = JSON.parse(localStorage.getItem('userData')!).token;
    return this.http.get<Employee>(
       'http://localhost:3000/employee-by-user?user=' + userId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getCourierByUser(userId: number): Observable<Courier> {
    const token: string = JSON.parse(localStorage.getItem('userData')!).token;
    return this.http.get<Courier>(
       'http://localhost:3000/courier-by-user?user=' + userId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }
}
