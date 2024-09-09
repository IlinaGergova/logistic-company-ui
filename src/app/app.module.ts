import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { ClientComponent } from './client/client.component';
import { CompanyComponent } from './company/company.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OfficeComponent } from './office/office.component';
import { OrderComponent } from './order/order.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    OrderComponent,
    ClientComponent,
    CompanyComponent,
    LoginPageComponent,
    AdminComponent,
    AdminPageComponent,
    OfficeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
