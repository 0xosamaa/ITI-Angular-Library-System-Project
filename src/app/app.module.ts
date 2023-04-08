import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TestComponent } from './test/test/test.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './employee/emplyee-list/employee-list.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { UpdateComponent } from './employee/update/update.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { WorkerLoginComponent } from './login/worker-login/worker-login.component';
import { ProfileComponent } from './employee/profile/profile.component';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { AdministratorComponent } from './administrator/administrator.component';
import { AdministratorDetailsComponent } from './administrator/administrator-details/administrator-details.component';
import { AdministratorListComponent } from './administrator/administrator-list/administrator-list.component';
import { AdministratorAddingComponent } from './administrator/administrator-adding/administrator-adding.component';
import { AdministratorEditingComponent } from './administrator/administrator-editing/administrator-editing.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TestComponent,
    EmployeeListComponent,
    UpdateComponent,
    AddEmployeeComponent,
    WorkerLoginComponent,
    ProfileComponent,
    AdministratorComponent,
    AdministratorDetailsComponent,
    AdministratorListComponent,
    AdministratorAddingComponent,
    AdministratorEditingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    DropdownModule,
    TagModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    ConfirmDialogModule,
    DividerModule,
    MessagesModule,
  ],
  providers: [
    { provide: 'baseURL', useValue: 'http://localhost:8080' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
