import { Component, OnInit } from '@angular/core';
import { MembersReport } from '../../_models/member-report.model';
import { MembersReportService } from '../../services/members-report.service';

@Component({
  selector: 'app-members-report',
  templateUrl: './members-report.component.html',
  styleUrls: ['./members-report.component.css'],
})
export class MembersReportComponent implements OnInit {
  reports: MembersReport[] | any;

  constructor(private reportService: MembersReportService) {}

  ngOnInit(): void {
    this.reportService.getAllReports().subscribe((reports: any) => {
      console.log(reports);
      this.reports = reports.data;
    });
  }
}
