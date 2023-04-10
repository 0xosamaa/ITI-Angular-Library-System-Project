import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoginUser} from "../../_models/login-user";

@Component({
  selector: 'app-worker-login',
  templateUrl: './worker-login.component.html',
  styleUrls: ['./worker-login.component.css']
})
export class WorkerLoginComponent {
  settings: any[] = [];
  setting: any;
  worker:LoginUser = new LoginUser("","");

  constructor(private authService: AuthService) {
    this.settings = [
      {name: 'Admin', code: 'admin'},
      {name: 'Employee', code: 'employee'},
    ]
  }

  login() {
    if (this.setting.code == 'admin') {
      this.authService.loginAdmin(this.worker).subscribe(
        (data:any) => {
          console.log(data);
          this.authService.isLoggedIn = true;
          if (data.data.email == "BasicAdmin@Library.Co"){
            this.authService.role = "basicAdmin";
            localStorage.setItem("role", "basicAdmin");
          }
          else {
            this.authService.role = "admin";
            localStorage.setItem("role", "admin");
          }
          this.authService.settings = data.data.settings || "manual";
          localStorage.setItem("token", data.token);
          localStorage.setItem("settings", data.data.settings || "manual");
          localStorage.setItem("data", JSON.stringify(data.data));
        }
      )
    } else if (this.setting.code == 'employee') {
      this.authService.loginEmployee(this.worker).subscribe(
        (data:any) => {
          this.authService.isLoggedIn = true;
          this.authService.role = "employee";
          this.authService.settings = data.data.settings || "manual";
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", "employee");
          localStorage.setItem("settings", data.data.settings || "manual");
          localStorage.setItem("data", JSON.stringify(data.data));
        }
      )
    }

  }

}
