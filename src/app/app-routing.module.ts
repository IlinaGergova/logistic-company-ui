import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminAuthGuard } from './login-page/admin-auth.guard';
import { AuthGuard } from './login-page/auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { CompanyComponent } from './company/company.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent},
  { path:'admin', component: AdminPageComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path: 'company/:id', component: CompanyComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
