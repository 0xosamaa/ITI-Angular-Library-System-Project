import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BorrowService {
  constructor(
    private http: HttpClient,
    @Inject('baseURL') public baseURL: string
  ) {}

  getBorrows() {
    return this.http.get(`${this.baseURL}/borrows`, {
      headers: {
        Authorization:
          'BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2ODExMjAxOTMsImV4cCI6MTY4MTE0ODk5M30.m1-PrGVGzeYIW7T9a3pSHc-TlyXazz12t7JEO5_sX2M',
      },
    });
  }
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2ODExMjAxOTMsImV4cCI6MTY4MTE0ODk5M30.m1-PrGVGzeYIW7T9a3pSHc-TlyXazz12t7JEO5_sX2M
