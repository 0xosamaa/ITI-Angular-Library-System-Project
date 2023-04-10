import { Component, OnInit } from '@angular/core';
import { EmployeeReport } from 'src/app/_models/employee-report.model';
import { EmployeeReportsService } from '../../services/employee-report.service';

@Component({
  selector: 'app-employee-reports',
  templateUrl: './employee-reports.component.html',
  styleUrls: ['./employee-reports.component.css'],
})
export class EmployeeReportsComponent implements OnInit {
  employeeReports: EmployeeReport[] = [];

  constructor(private employeeReportsService: EmployeeReportsService) {}

  ngOnInit() {
    this.employeeReportsService.getAllReports().subscribe(
      (data:any) => {
        console.log(data);
        this.employeeReports = data.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
