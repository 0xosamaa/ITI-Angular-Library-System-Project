import {Component, Input} from '@angular/core';
import {Employee} from "../../_models/employee";
import {EmployeeService} from "../../services/employee.service";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers: [MessageService]
})

export class UpdateComponent {
   @Input() employee:Employee;
   @Input() user:string;
   visible:boolean = false;
   settings: any[] = [];
   setting: any;
   birthDate: Date = new Date();
   hireDate: Date = new Date();


  constructor(private empService:EmployeeService,private messageService: MessageService) {
    this.employee = new Employee(
      "",
      "",
      "",
      "",
      undefined,
      "",
      "",
      "",
      "",
      0
    );
    this.user = "";

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
    this.employee.password = undefined;

  }

  showUpdateDialog() {
    this.visible = true;
  }

  save() {
    this.employee.birthDate = this.birthDate.toISOString();
    this.employee.hireDate = this.hireDate.toISOString();
    this.employee.settings = this.setting.code;
    console.log(this.employee);
    // delete password from employee object
    if(this.employee.password == ""){
      this.employee.password = undefined;
    }

    this.empService.updateEmployee(this.employee).subscribe(
      (data:any) => {
        if (this.user == "emp"){
          localStorage.setItem('data', JSON.stringify(this.employee));
          if (this.employee.settings == "manual"){
            localStorage.setItem('settings', "manual");
          }
        }
        this.visible = false;
      },
      (error) => {
        console.log(error.error.message);

      }
  );
}






}
