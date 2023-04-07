import {Component, OnInit} from '@angular/core';
import {LoginUser} from "../../_models/login-user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{

  user : LoginUser = new LoginUser("BasicAdmin@Library.Co","root@1997");

  constructor(public authService : AuthService , public router : Router) { }

  ngOnInit() {
    this.authService.loginAdmin(this.user).subscribe(
      (data) => {
        console.log((<any>data)["token"]);
        this.authService.isLoggedIn = true;
        this.authService.role = "admin";
        //localStorage.setItem("token", (<any>data)["token"]);
      },
    );
  }


}
