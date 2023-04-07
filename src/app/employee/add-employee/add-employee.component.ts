import {Component, Input} from '@angular/core';
import {Employee} from "../../_models/employee";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employee:Employee;
  visible:boolean = false;
  settings: any[] = [];
  setting: any;
  birthDate: Date = new Date();
  hireDate: Date = new Date();

  constructor(private empService:EmployeeService) {
    this.employee = new Employee(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      0
    );

    this.settings = [
      {name: 'Default', code: 'default'},
      {name: 'Manual', code: 'manual'},
    ]
    // create date object with date from employee
    this.birthDate = new Date();
    this.hireDate = new Date();
  }

  ngOnChanges(): void {
    this.birthDate = new Date(this.employee.birthDate);
    this.hireDate = new Date(this.employee.hireDate);

  }

  showAddDialog() {
    this.visible = true;
  }

  save() {
    this.employee.birthDate = this.birthDate.toISOString();
    this.employee.hireDate = this.hireDate.toISOString();
    this.employee.settings = this.setting.code;
    this.empService.addEmployee(this.employee).subscribe(
      (data:any) => {
        this.visible = false;
        window.location.reload();
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }



}

