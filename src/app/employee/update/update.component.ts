import {Component, Input} from '@angular/core';
import {Employee} from "../../_models/employee";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
   @Input() employee:Employee;
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
      {name: 'Manual', code: 'manual'},
      {name: 'Default', code: 'default'},
    ]
    // create date object with date from employee

  }

  ngOnChanges(): void {
    if(this.employee.settings == "manual"){
      this.setting = {name: 'Manual', code: 'manual'};
    }
    else if(this.employee.settings == "default"){
      this.setting = {name: 'Default', code: 'default'};
    }

    this.birthDate = new Date(this.employee.birthDate);
    this.hireDate = new Date(this.employee.hireDate);

  }

  showUpdateDialog() {
    this.visible = true;
  }

  save() {
    this.employee.birthDate = this.birthDate.toISOString();
    this.employee.hireDate = this.hireDate.toISOString();
    this.employee.settings = this.setting.code;
    this.empService.updateEmployee(this.employee).subscribe(
      (data:any) => {
        this.visible = false;
      },
      (error) => {
        console.log(error.error.message);

      }
  );
}



}
