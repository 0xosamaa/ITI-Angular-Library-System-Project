import {Component, OnInit, ViewChild} from '@angular/core';
import {Employee} from "../../_models/employee";
import {UpdateComponent} from "../update/update.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  @ViewChild(UpdateComponent) child: UpdateComponent | undefined;
  userData:Employee|any;
  message:any[] = [];
  constructor() {
    if(localStorage.getItem('data') != null) {
      //this.userData = new Employee("","","","","", "", "", "","",0);
      this.userData = JSON.parse(localStorage.getItem('data') || '{}');
      this.userData.password = undefined;
      console.log(this.userData)
    }
  }

  ngOnInit(): void {
    this.message = [
      { severity: 'warn', summary: 'Waning', detail: 'You Must Set New Password To Do any operations' },
    ];
  }

  updateProfile() {
    this.child?.showUpdateDialog();
  }

  logout() {
    localStorage.removeItem('data');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('settings');
    window.location.href = "/workers/login";
  }

}
