import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Order } from './order';
import { NgForm } from '@angular/forms';
import { UserService } from '../login-page/user.service';
import { OfficeService } from '../office/office.service';
import { OrderService } from './order.service';
import { Office } from '../office/office';
import { Employee } from '../employee/employee';
import { Client } from '../client/client';
import { combineLatest, of } from 'rxjs';
import { EmployeeService } from '../employee/employee.service';
import { Position } from '../login-page/user';
import { ClientService } from '../client/client.service';


const TAX_FUEL_OFFICE =  1.13;
const TAX_FUEL_ADDRESS =  2.23;
const TAX_SERVICE =  1.13;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  @Input() companyId: number;
  orders: Order[];
  shownOrders: Order[];
  offices: Office[];
  couriers: Employee[];
  workers: Employee[];
  clients: Client[];
  error = '';
  currentEditOrder: Order = null;
  editOrderMode = false;
  createOrderMode = false;
  isOfficeSelected = false;
  isAddressSelected = false;
  pendingSwitch = true;
  receivedSwitch = true;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private officeService: OfficeService,
    private employeeService: EmployeeService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  public getOrders(): void {
    this.orderService.getOrders(this.companyId).subscribe(
      orders => {
        this.orders = orders;
        this.shownOrders = orders;
      }
    );
  }

  public showHideReceived(): void {
    this.receivedSwitch = !this.receivedSwitch;
    if(this.receivedSwitch) {
      this.shownOrders = this.shownOrders.concat(this.orders.filter(order => order.receivedDate !== null));
    }
    else {
      this.shownOrders = this.shownOrders.filter(order => order.receivedDate === null);
    }
  }

  public showHidePending(): void {
    this.pendingSwitch = !this.pendingSwitch;
    if(this.pendingSwitch) {
      this.shownOrders = this.shownOrders.concat(this.orders.filter(order => order.receivedDate === null));
    }
    else {
      this.shownOrders = this.shownOrders.filter(order => order.receivedDate !== null);
    }
  }

  public edit(selectedOrder: Order): void {

    combineLatest([
      this.officeService.getOffices(this.companyId),
      this.employeeService.getEmployeesByPosition(this.companyId, Position.Courier),
      this.employeeService.getEmployeesByPosition(this.companyId, Position.OfficeWorker),
      this.clientService.getClients(this.companyId),
    ]).subscribe(([offices, couriers, workers, clients]) => {
      this.offices = offices;
      this.couriers = couriers;
      this.workers = workers;
      this.clients = clients;

    this.editOrderMode = true;
    if(selectedOrder.address) {
      this.isAddressSelected = true;
    } else {
      this.isOfficeSelected = true;
    }
    this.currentEditOrder = selectedOrder;
  })

  }

  public delete(orderId: number): void {
    this.orderService.removeOrder(orderId).subscribe(() => this.getOrders());
  }

  public markAsReceived(orderId: number): void {
    this.orderService.receiveOrder(
      orderId,
     new Date()
    ).subscribe({
      next: () => this.getOrders(),
      error: err => this.error = err
    })
    // this.editOrderMode = false;
  }

  public editOrder(form: NgForm, orderId: number): void {
    this.orderService.updateOrder(
      orderId,
      parseInt(form.value.orderRecipientId),
      parseInt(form.value.orderOfficeWorkerId),
      parseInt(form.value.orderCourierId),
      form.value.orderAddress,
      parseInt(form.value.orderOfficeId),
    ).subscribe({
      next: () => this.getOrders(),
      error: err => this.error = err
    })
    form.reset();
    this.editOrderMode = false;
  }

  public createOrderForm(form: NgForm): void {
    let price = 0;
    price = this.calculatePrice(parseInt(form.value.orderWeight));

    let address = null;
    if(form.value.orderAddress) {
      address = form.value.orderAddress;
    }

    let officeId = null;
    if(form.value.orderOfficeId) {
      officeId = parseInt(form.value.orderOfficeId);
    }

    this.orderService.createOrder(
        this.companyId,
        parseInt(form.value.orderSenderId),
        parseInt(form.value.orderRecipientId),
        parseFloat(form.value.orderWeight),
        price,
        parseInt(form.value.orderOfficeWorkerId),
        parseInt(form.value.orderCourierId),
        new Date(),
        address,
        officeId,
        null,
        ).subscribe({
      next: () => {
        this.getOrders()
        form.reset();
        this.createOrderMode = false;
        this.isAddressSelected = false;
        this.isOfficeSelected = false;
      },
      error: err => this.error = err
    })
  }

  public calculatePrice(weight: number): number {
    const totalTax = TAX_SERVICE + weight * (this.isAddressSelected ? TAX_FUEL_ADDRESS : TAX_FUEL_OFFICE);
    return parseFloat(totalTax.toFixed(2));
  }

  public openForm(): void {
    combineLatest([
      this.officeService.getOffices(this.companyId),
      this.employeeService.getEmployeesByPosition(this.companyId, Position.Courier),
      this.employeeService.getEmployeesByPosition(this.companyId, Position.OfficeWorker),
      this.clientService.getClients(this.companyId),
    ]).subscribe(([offices, couriers, workers, clients]) => {
      this.offices = offices;
      this.couriers = couriers;
      this.workers = workers;
      this.clients = clients;

      this.createOrderMode = true;
    })
  }

  public cancel(): void {
    this.createOrderMode = false;
    this.editOrderMode = false;
    this.isAddressSelected = false;
    this.isOfficeSelected = false;
  }
}
