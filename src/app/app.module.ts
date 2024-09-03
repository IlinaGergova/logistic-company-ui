import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { CourierComponent } from './courier/courier.component';
import { CourierProfileComponent } from './courier-profile/courier-profile.component';
import { ClientComponent } from './client/client.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { CompanyComponent } from './company/company.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OfficeComponent } from './office/office.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeProfileComponent,
    OrderComponent,
    CourierComponent,
    CourierProfileComponent,
    ClientComponent,
    ClientProfileComponent,
    CompanyComponent,
    LoginPageComponent,
    AdminComponent,
    HomePageComponent,
    OfficeComponent,
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
