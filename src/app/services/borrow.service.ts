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

  getAllBorrows() {
    return this.http.get(`${this.baseURL}/borrows`);
  }

  getBorrow(id: string) {
    return this.http.get(`${this.baseURL}/borrows/${id}`);
  }

  addBorrow(formData: FormData) {
    return this.http.post(`${this.baseURL}/borrows`, formData);
  }

  updateBorrow(formData: FormData) {
    return this.http.patch(
      `${this.baseURL}/borrows/${formData.get('_id')}`,
      formData
    );
  }

  deleteBorrow(id: string) {
    return this.http.delete(`${this.baseURL}/administrators/${id}`);
  }
}
