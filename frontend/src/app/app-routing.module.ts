import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UsersComponent } from './components/sections/system/users/users.component';
import { RequestComponent } from './components/sections/request/request.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'home', component: DashboardComponent,
    children: [
      
      {path: 'system/users', component: UsersComponent},

      {path: 'request/new', component: RequestComponent},
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
