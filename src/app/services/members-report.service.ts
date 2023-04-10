import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MembersReport } from '../_models/member-report.model';

@Injectable({
  providedIn: 'root',
})
export class MembersReportService {
  constructor(
    public http: HttpClient,
    @Inject('baseURL') public baseURL: string
  ) {}

  getAllReports(): Observable<MembersReport[]> {
    return this.http.get<MembersReport[]>(`${this.baseURL}/members/report`);
  }
}
