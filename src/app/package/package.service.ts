import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../login-page/user';
import { Package } from './package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  constructor(private http: HttpClient) { }

  public getPackages(companyId: number): Observable<Package[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Package[]>(
       'http://localhost:3000/packages?companyId=' + companyId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getPackagesByOffice(officeId: number): Observable<Package[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Package[]>(
       'http://localhost:3000/packages-by-office?officeId=' + officeId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getPackagesBySender(senderId: number): Observable<Package[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Package[]>(
       'http://localhost:3000/packages-by-sender?senderId=' + senderId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getPackagesByRecipient(recipientId: number): Observable<Package[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Package[]>(
       'http://localhost:3000/packages-by-office?recipientId=' + recipientId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getPackage(id: number): Observable<Package> {
    return this.http.get<Package>(
       'http://localhost:3000/package?id=' + id,
    )
  }

  public createPackage(
    companyId: number,
    senderId: number,
    recipient: number,
    weight: number,
    price: number,
    officeWorkerId: number,
    courierId: number,
    sentDate: Date,
    address?: number,
    officeId?: number,
    receivedDate?: Date,

  ) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/create-package',
      {
        companyId: companyId,
        senderId: senderId,
        recipient: recipient,
        weight: weight,
        price: price,
        officeWorkerId: officeWorkerId,
        courierId: courierId,
        sentDate: sentDate,
        address: address,
        officeId: officeId,
        receivedDate: receivedDate,
      },
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public updatePackage(
    id: number,
    recipient: number,
    officeWorkerId: number,
    courierId: number,
    address?: number,
    officeId?: number,
    receivedDate?: Date,
  ) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/update-package',
      {
        id: id,
        recipient: recipient,
        officeWorkerId: officeWorkerId,
        courierId: courierId,
        address: address,
        officeId: officeId,
        receivedDate: receivedDate,
      },
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public removePackage(id: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/remove-package',
      {id: id},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }
}
