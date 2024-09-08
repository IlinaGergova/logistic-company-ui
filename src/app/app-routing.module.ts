import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminAuthGuard } from './login-page/admin-auth.guard';
import { AuthGuard } from './login-page/auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { EmployeeComponent } from './employee/employee.component';
import { ClientComponent } from './client/client.component';
import { CompanyComponent } from './company/company.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent},
  { path:'home', component: HomePageComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path: 'company/:id', component: CompanyComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
