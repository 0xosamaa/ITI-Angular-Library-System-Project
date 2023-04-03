import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginUser} from "../_models/login-user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  role: string;

  constructor(public http : HttpClient, @Inject("baseURL") public baseURL : string) {
    this.role = "";
  }

  loginAdmin(user: LoginUser) {
    return this.http.post(this.baseURL + "/login/administrator", user);
  }

  loginEmployee(user: LoginUser) {
    return this.http.post(this.baseURL + "/login/employee", user);
  }

  loginMember(user: LoginUser) {
    return this.http.post(this.baseURL + "/login/member", user);
  }



}
