import {Component, OnInit, ViewChild} from '@angular/core';
import {Employee} from "../../_models/employee";
import {EmployeeService} from "../../services/employee.service";
import {Table} from "primeng/table";
import { DialogModule } from 'primeng/dialog';
import {UpdateComponent} from "../update/update.component";
import {AddEmployeeComponent} from "../add-employee/add-employee.component";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class EmployeeListComponent implements OnInit{
  @ViewChild(UpdateComponent) child: UpdateComponent | undefined;
  @ViewChild(AddEmployeeComponent) addChild: AddEmployeeComponent | undefined;
  employees:Employee[] = [];
  employee:Employee;
  loading: boolean = true;
  statuses: any[] = [];
  activityValues: number[] = [0, 100];
  detailsVisible: boolean = false;
  constructor(private empService:EmployeeService,private confirmationService: ConfirmationService, private messageService: MessageService) {
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
  }

  ngOnInit(): void {
    this.statuses = [
      {label: 'Manual', value: 'manual'},
      {label: 'Default', value: 'default'},
    ]
    this.loading = false;
    this.empService.getEmployees().subscribe(
      (data:any) => {
        this.employees = data.data;
        console.log(this.employees);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
  showDialog(emp:Employee) {
    this.detailsVisible = true;
    this.employee = emp;
  }

  updateDialog(emp:Employee) {
    this.employee = emp;
    this.child?.showUpdateDialog();
  }

  addDialog() {
    this.addChild?.showAddDialog();
  }


  confirm(_id:any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        // delete record
        this.empService.deleteEmployee(_id).subscribe(
          (data:any) => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            this.empService.getEmployees().subscribe(
              (data:any) => {
                this.employees = data.data;
                console.log(this.employees);
              },
              (error) => {
                console.log(error.error.message);
              }
            );
          },
          (error) => {
            console.log(error.error.message);
          }
        );


      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }

  clear(table: Table) {
    table.clear();
  }
}
