import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TestComponent } from './test/test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; //HttpClientModule
import { EmployeeListComponent } from './employee/emplyee-list/employee-list.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ImageModule } from 'primeng/image';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { UpdateComponent } from './employee/update/update.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { WorkerLoginComponent } from './login/worker-login/worker-login.component';
import { ProfileComponent } from './employee/profile/profile.component';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { InputMaskModule } from 'primeng/inputmask';
import { BookListComponent } from './book/book-list/book-list.component';

import { AddBookComponent } from './book/add-book/add-book.component';
import { UpdateBookComponent } from './book/update-book/update-book.component';
import { DeleteBookComponent } from './book/delete-book/delete-book.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';

import { FileUploadModule } from 'primeng/fileupload';
import { AdministratorComponent } from './administrator/administrator.component';
import { AdministratorDetailsComponent } from './administrator/administrator-details/administrator-details.component';
import { AdministratorListComponent } from './administrator/administrator-list/administrator-list.component';
import { AdministratorAddingComponent } from './administrator/administrator-adding/administrator-adding.component';
import { AdministratorEditingComponent } from './administrator/administrator-editing/administrator-editing.component';
import { AdministratorReportComponent } from './report/administrator-report/administrator-report.component';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { AddMemberComponent } from './member/add-member/add-member.component';
import { EditMemberComponent } from './member/edit-member/edit-member.component';
import { MemberDetailsComponent } from './member/member-details/member-details.component';
import { DeleteMemberComponent } from './member/delete-member/delete-member.component';
import { BorrowDetailsComponent } from './borrow/borrow-details/borrow-details.component';
import { BorrowAddingComponent } from './borrow/borrow-adding/borrow-adding.component';
import { BorrowEditingComponent } from './borrow/borrow-editing/borrow-editing.component';
import { BorrowListComponent } from './borrow/borrow-list/borrow-list.component';
import { BorrowComponent } from './borrow/borrow.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TestComponent,
    LoginComponent,
    EmployeeListComponent,
    UpdateComponent,
    AddEmployeeComponent,
    WorkerLoginComponent,
    ProfileComponent,
    BookListComponent,

    AddBookComponent,
    UpdateBookComponent,
    DeleteBookComponent,
    BookDetailsComponent,

    AdministratorComponent,
    AdministratorDetailsComponent,
    AdministratorListComponent,
    AdministratorAddingComponent,
    AdministratorEditingComponent,
    AdministratorReportComponent,

    SideBarComponent,
    MemberListComponent,
    AddMemberComponent,
    EditMemberComponent,
    MemberDetailsComponent,
    DeleteMemberComponent,
    BorrowDetailsComponent,
    BorrowAddingComponent,
    BorrowEditingComponent,
    BorrowListComponent,
    BorrowComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputMaskModule,
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
    InputNumberModule,
    CheckboxModule,
    PasswordModule,
    ToastModule,
    ConfirmDialogModule,
    ImageModule,
    DividerModule,
    MessagesModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: 'baseURL', useValue: 'http://localhost:8080' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
