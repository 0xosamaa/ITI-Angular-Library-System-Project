import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee/emplyee-list/employee-list.component";
import {TestComponent} from "./test/test/test.component";
import {WorkerLoginComponent} from "./login/worker-login/worker-login.component";
import {AdminGuardGuard} from "./guards/admin-guard.guard";
import {ProfileComponent} from "./employee/profile/profile.component";
import {EmpGuardGuard} from "./guards/emp-guard.guard";
import {ProfileGuard} from "./guards/profile.guard";
import { BookListComponent } from './book/book-list/book-list.component';

const routes: Routes = [
  {path: 'workers/login',component:WorkerLoginComponent},
  {path: 'employees',component:EmployeeListComponent, canActivate: [AdminGuardGuard]},
  {path: 'employee/profile',component:ProfileComponent, canActivate: [ProfileGuard]},
  {path: 'books',component:BookListComponent, canActivate: [AdminGuardGuard]},
  { path: '', component: TestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
