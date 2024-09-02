import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  public getClients(companyId: number): Observable<Client[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Client[]>(
       'http://localhost:3000/clients?companyId=' + companyId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public createClient(name: string, address: string, contact: string, companyId: number, userId: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/create-client',
      {name: name, address: address, contact: contact, companyId: companyId, userId: userId},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public updateClient(id: number, name: string, address: string, contact: string) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/update-client',
      {id: id, name: name, address: address, contact: contact},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public removeClient(id: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/remove-client',
      {id: id},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }
}
