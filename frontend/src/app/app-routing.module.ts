import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UsersComponent } from './components/sections/system/users/users.component';
import { RequestComponent } from './components/sections/requests/request/request.component';
import { PendingRequestComponent } from './components/sections/requests/pending-request/pending-request.component';
import { SignedRequestComponent } from './components/sections/requests/signed-request/signed-request.component';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard], data: {route: 'auth'}},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: {route: 'auth'}},
  {
    path: 'home', component: DashboardComponent,
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    children: [
      
      {path: 'system/users', component: UsersComponent},

      {path: 'request/new', component: RequestComponent},
      {path: 'request/pending-request', component: PendingRequestComponent},
      {path: 'request/signed-request', component: SignedRequestComponent},
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
