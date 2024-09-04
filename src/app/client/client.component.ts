import { Component, Input, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { NgForm } from '@angular/forms';
import { switchMap, of } from 'rxjs';
import { Role, Position } from '../login-page/user';
import { UserService } from '../login-page/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @Input() companyId: number;
  clients: Client[];
  error = '';
  editClientMode = false;
  createClientMode = false;
  currentEditClient: Client = null;


  constructor(
    private clientService: ClientService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  public getClients(): void {
    this.clientService.getClients(this.companyId).subscribe(
      clients => this.clients = clients
    );
  }

  public edit(client: Client): void {
    this.editClientMode = true;
    this.currentEditClient = client;
  }

  public delete(clientId: number): void {
    this.clientService.removeClient(clientId).subscribe(() => this.getClients());
  }

  public editClient(form: NgForm, clientId: number): void {
    this.clientService.updateClient(
      clientId,
      form.value.clientName,
      form.value.clientAddress,
      form.value.clientContact,
    ).subscribe({
      next: () => this.getClients(),
      error: err => this.error = err
    })
    form.reset();
    this.editClientMode = false;
  }

  public createClientForm(form: NgForm): void {
    this.userService.createUser(
      Role.Client,
      form.value.clientUsername,
      form.value.clientPassword,
    ).pipe(
      switchMap((userId: number) => {
        if (!userId) {
          return of();
        }
        return this.clientService.createClient(
          form.value.clientName,
          form.value.clientAddress,
          form.value.clientContact,
          this.companyId,
          userId,
        )
      })
    ).subscribe({
      next: () => {
        this.getClients()
        form.reset();
        this.createClientMode = false;
      },
      error: err => this.error = err
    })
  }

  public cancelClientCreation(): void {
    this.createClientMode = false;
  }
}
