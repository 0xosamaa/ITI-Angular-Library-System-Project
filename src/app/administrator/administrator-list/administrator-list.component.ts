import { AdministratorService } from 'src/app/services/administrator.service';
import { Administrator } from './../../_models/administrator';
import { Component } from '@angular/core';

@Component({
  selector: 'app-administrator-list',
  templateUrl: './administrator-list.component.html',
  styleUrls: ['./administrator-list.component.css'],
})
export class AdministratorListComponent {
  administratorList: any;
  constructor(private adminService: AdministratorService) {
    // this.administratorList = new Object({
    //   firstName: 'Ahmed',
    //   lastName: 'Amer',
    //   email: 'Z@a',
    // });
    //this.adminService.getAllAdministrators;
  }
  ngOnInit() {
    this.adminService.getAllAdministrators().subscribe(
      (data: any) => {
        this.administratorList = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
