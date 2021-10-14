import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/structure/header/header.component';
import { MaterialModule } from './modules/material/material.module';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { CalendarComponent } from './components/sections/calendar/calendar.component';
import { UsersComponent } from './components/sections/system/users/users.component';
import { UserDialogComponent } from './components/sections/dialogs/user-dialog/user-dialog.component';
import { RequestComponent } from './components/sections/requests/request/request.component';
import { RequestItemComponent } from './components/sections/dialogs/request-item/request-item.component';
import { RequestDialogComponent } from './components/sections/dialogs/request-dialog/request-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MaintenanceComponent } from './components/sections/maintenance/maintenance.component';
import { MaintenanceDialogComponent } from './components/sections/dialogs/maintenance-dialog/maintenance-dialog.component';
import { MaintenanceItemComponent } from './components/sections/dialogs/maintenance-item/maintenance-item.component';
import { CalendarDialogComponent } from './components/sections/dialogs/calendar-dialog/calendar-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    CalendarComponent,
    UsersComponent,
    UserDialogComponent,
    RequestComponent,
    RequestItemComponent,
    RequestDialogComponent,
    MaintenanceComponent,
    MaintenanceDialogComponent,
    MaintenanceItemComponent,
    CalendarDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
