import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeReport } from '../_models/employee-report.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeReportsService {
  constructor( public http: HttpClient, @Inject('baseURL') public baseUrl: string
  ) {}

  getAllReports(): Observable<EmployeeReport[]> {
    return this.http.get<EmployeeReport[]>(`${this.baseUrl}/employee/reports`);
  }
}

