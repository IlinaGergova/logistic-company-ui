import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OfficeWorkerComponent } from './office-worker/office-worker.component';
import { OfficeWorkerProfileComponent } from './office-worker-profile/office-worker-profile.component';
import { PackageComponent } from './package/package.component';
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

@NgModule({
  declarations: [
    AppComponent,
    OfficeWorkerComponent,
    OfficeWorkerProfileComponent,
    PackageComponent,
    CourierComponent,
    CourierProfileComponent,
    ClientComponent,
    ClientProfileComponent,
    CompanyComponent,
    LoginPageComponent,
    AdminComponent,
    HomePageComponent
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
