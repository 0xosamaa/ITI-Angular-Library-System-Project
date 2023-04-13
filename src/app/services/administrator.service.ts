import { Administrator } from './../_models/administrator';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  administratorsList: Administrator[] = [];
  administrator: Administrator | null = null;

  constructor(
    public http: HttpClient,
    @Inject('baseURL') public baseURL: string
  ) {}

  getAllAdministrators(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(this.baseURL + '/administrators');
  }

  getAdministrator(id: string) {
    return this.http.get(this.baseURL + '/administrators/' + id);
  }

  addAdministrator(formData: FormData) {
    return this.http.post(this.baseURL + '/administrators', formData);
  }

  updateAdministrator(formData: FormData) {
    return this.http.patch(
      this.baseURL + '/administrators/' + formData.get('_id'),
      formData
    );
  }

  deleteAdministrator(id: string) {
    return this.http.delete(this.baseURL + '/administrators/' + id);
  }
}
