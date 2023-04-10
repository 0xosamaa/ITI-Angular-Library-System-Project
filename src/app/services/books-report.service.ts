import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BooksReport } from '../_models/book-report.model';

@Injectable({
  providedIn: 'root',
})
export class BooksReportService {
  constructor(
    public http: HttpClient,
    @Inject('baseURL') public baseURL: string
  ) {}

  getAllReports(): Observable<BooksReport[]> {
    return this.http.get<BooksReport[]>(`${this.baseURL}/report/readingBook`);
  }
}
