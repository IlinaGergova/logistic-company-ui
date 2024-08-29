import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminAuthGuard } from './login-page/admin-auth.guard';
import { AuthGuard } from './login-page/auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { OfficeWorkerComponent } from './office-worker/office-worker.component';
import { ClientComponent } from './client/client.component';
import { CourierComponent } from './courier/courier.component';
import { CompanyComponent } from './company/company.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent},
  { path:'home', component: HomePageComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  { path: 'company/:name', component: CompanyComponent, canActivate: [AuthGuard]},
  { path: 'office-worker-profile/:id', component: OfficeWorkerComponent, canActivate: [AuthGuard]},
  { path: 'client-profile/:id', component: ClientComponent, canActivate: [AuthGuard]},
  { path: 'courier-profile/:id', component: CourierComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
