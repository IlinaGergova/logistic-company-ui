import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  public getOrders(companyId: number): Observable<Order[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Order[]>(
       'http://localhost:3000/orders?companyId=' + companyId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getOrdersByOffice(officeId: number): Observable<Order[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Order[]>(
       'http://localhost:3000/orders-by-office?officeId=' + officeId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getOrdersBySender(senderId: number): Observable<Order[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Order[]>(
       'http://localhost:3000/orders-by-sender?senderId=' + senderId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getOrdersByRecipient(recipientId: number): Observable<Order[]> {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.get<Order[]>(
       'http://localhost:3000/orders-by-recipient?recipientId=' + recipientId,
       {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(
       'http://localhost:3000/order?id=' + id,
    )
  }

  public createOrder(
    companyId: number,
    senderId: number,
    recipientId: number,
    weight: number,
    price: number,
    officeWorkerId: number,
    courierId: number,
    sentDate: Date,
    address: string,
    officeId: number,
    receivedDate: Date,
  ) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/create-order',
      {
        companyId: companyId,
        senderId: senderId,
        recipientId: recipientId,
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

  public updateOrder(
    id: number,
    recipient: number,
    officeWorkerId: number,
    courierId: number,
    address?: number,
    officeId?: number,
  ) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/update-order',
      {
        id: id,
        recipient: recipient,
        officeWorkerId: officeWorkerId,
        courierId: courierId,
        address: address,
        officeId: officeId,
      },
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public receiveOrder(
    id: number,
    receivedDate: Date,
  ) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/receive-order',
      {
        id: id,
        receivedDate: receivedDate,
      },
      {headers: {"Authorization": "Bearer " + token}}
    )
  }

  public removeOrder(id: number) {
    const token: string = JSON.parse(localStorage.getItem('userData')).token;
    return this.http.post(
      'http://localhost:3000/remove-order',
      {id: id},
      {headers: {"Authorization": "Bearer " + token}}
    )
  }
}
