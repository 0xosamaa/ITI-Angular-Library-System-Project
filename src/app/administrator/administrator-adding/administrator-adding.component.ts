import { Component } from '@angular/core';
import { Administrator } from 'src/app/_models/administrator';
import { AdministratorService } from 'src/app/services/administrator.service';

@Component({
  selector: 'app-administrator-adding',
  templateUrl: './administrator-adding.component.html',
  styleUrls: ['./administrator-adding.component.css'],
})
export class AdministratorAddingComponent {
  administrator: Administrator;
  hireDate: Date = new Date();
  birthday: Date = new Date();
  visible: boolean = false;

  constructor(private adminService: AdministratorService) {
    this.administrator = new Administrator('', '', '', '', '', '', '', 0, '');
  }

  showAddDialog() {
    console.log('heeeeeeeeeeeeeeeeeeeeeeeeey');
    this.visible = true;
  }

  addAdministrator() {
    this.administrator.hireDate = this.hireDate.toISOString();
    this.administrator.birthday = this.birthday.toISOString();

    this.adminService.addAdministrator(this.administrator).subscribe(
      (data) => {
        console.log(data);
        this.visible = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
