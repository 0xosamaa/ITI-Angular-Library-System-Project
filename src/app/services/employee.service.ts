import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../_models/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  empls:Employee[] = [];
  emp:Employee | null = null;


  constructor(public http:HttpClient , @Inject("baseURL") public baseURL:string) {
  }

  getEmployees() {
    return this.http.get(this.baseURL + "/employee");
  }

  getEmployee(id: number) {
    return this.http.get(this.baseURL + "/employee/" + id);
  }

  addEmployee(employee: Employee) {
    return this.http.post(this.baseURL + "/employee", employee);
  }

  updateEmployee(employee: Employee | FormData) {
    return this.http.put(this.baseURL + "/employee/", employee);
  }

  deleteEmployee(id: any) {
    return this.http.delete(this.baseURL + "/employee/" + id);
  }

}
