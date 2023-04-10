import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee/emplyee-list/employee-list.component';
import { TestComponent } from './test/test/test.component';
import { WorkerLoginComponent } from './login/worker-login/worker-login.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { ProfileComponent } from './employee/profile/profile.component';
import { EmpGuardGuard } from './guards/emp-guard.guard';
import { ProfileGuard } from './guards/profile.guard';
import { AdministratorComponent } from './administrator/administrator.component';
import { EmployeeReportsComponent } from './reports/employee-reports/employee-reports.component';
import { BooksReportsComponent } from './reports/books-report/books-report.component';
import { MembersReportComponent } from './reports/members-report/members-report.component';


const routes: Routes = [
  { path: 'workers/login', component: WorkerLoginComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AdminGuardGuard],
  },
  {
    path: 'employee/profile',
    component: ProfileComponent,
    canActivate: [ProfileGuard],
  },
  { path: '', component: TestComponent },
  {
    path: 'administrators',
    component: AdministratorComponent,
    // canActivate: [AdminGuardGuard],
  },
  { path: 'employee/report', component: EmployeeReportsComponent
  ,canActivate: [AdminGuardGuard]
},
{ path: 'books/report', component: BooksReportsComponent
,canActivate: [AdminGuardGuard]
},
{ path: 'members/report', component: MembersReportComponent
,canActivate: [AdminGuardGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
