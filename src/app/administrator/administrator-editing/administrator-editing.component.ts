import { Component, OnInit } from '@angular/core';
import { Administrator } from 'src/app/_models/administrator';
import { AdministratorService } from 'src/app/services/administrator.service';

@Component({
  selector: 'app-administrator-editing',
  templateUrl: './administrator-editing.component.html',
  styleUrls: ['./administrator-editing.component.css'],
})
export class AdministratorEditingComponent {
  administrator: Administrator;
  hireDate: Date = new Date();
  birthday: Date = new Date();
  visible: boolean = false;
  adminId: any;

  constructor(private adminService: AdministratorService) {
    this.administrator = new Administrator('', '', '', '', '', '', '', 0, '');
  }
  ngOnInit(): void {
    this.adminService.getAdministrator(this.adminId).subscribe((data: any) => {
      this.administrator = data.data[0];
    });
  }
  showEditgToggle(id: any) {
    this.adminId = id;
    this.adminService.getAdministrator(this.adminId).subscribe((data: any) => {
      this.administrator = data.data[0];
    });
    this.visible = !this.visible;
  }

  editAdministrator() {
    console.log(this.adminId);
    console.log(this.administrator);
    this.adminService
      .updateAdministrator(this.administrator)
      .subscribe((data: any) => {
        this.administrator = data.data;
      });
  }
  editDialogToggle() {
    this.visible = !this.visible;
  }
}
