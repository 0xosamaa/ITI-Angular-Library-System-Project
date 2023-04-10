import { Component } from '@angular/core';
import { Administrator } from 'src/app/_models/administrator';
import { AdministratorService } from 'src/app/services/administrator.service';

@Component({
  selector: 'app-administrator-details',
  templateUrl: './administrator-details.component.html',
  styleUrls: ['./administrator-details.component.css'],
})
export class AdministratorDetailsComponent {
  administrator: Administrator;

  hireDate: Date = new Date();
  birthday: Date = new Date();
  visible: boolean = false;
  adminId: any;

  constructor(private adminService: AdministratorService) {
    this.administrator = new Administrator('', '', '', '', '', '', '', 0, '');
  }

  showDialogToggle(id: any) {
    this.adminId = id;
    this.adminService.getAdministrator(this.adminId).subscribe((data: any) => {
      this.administrator = data.data[0];
      console.log(data.data);
    });
    this.visible = !this.visible;
  }
  detailsDialogToggle() {
    this.visible = !this.visible;
  }
}
