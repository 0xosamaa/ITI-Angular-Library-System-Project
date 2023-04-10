import { Component, OnInit } from '@angular/core';
import { BooksReport } from '../../_models/book-report.model';
import { BooksReportService } from '../../services/books-report.service';

@Component({
  selector: 'app-reading-books-reports',
  templateUrl: './books-report.component.html',
  styleUrls: ['./books-report.component.css'],
})
export class BooksReportsComponent implements OnInit {
  reports: BooksReport[] | any;

  constructor(private reportService: BooksReportService) {}

  ngOnInit(): void {
    this.reportService.getAllReports().subscribe((reports:any) => {
      console.log(reports);
      this.reports = reports.data;
    });
  }
}


