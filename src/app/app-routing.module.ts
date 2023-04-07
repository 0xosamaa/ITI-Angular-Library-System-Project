import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee/emplyee-list/employee-list.component";
import {TestComponent} from "./test/test/test.component";

const routes: Routes = [
  {path: 'employees',component:EmployeeListComponent},
  { path: '', component: TestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
