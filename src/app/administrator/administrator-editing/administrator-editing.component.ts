import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Administrator } from 'src/app/_models/administrator';
import { AdministratorService } from 'src/app/services/administrator.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-administrator-editing',
  templateUrl: './administrator-editing.component.html',
  styleUrls: ['./administrator-editing.component.css'],
})
export class AdministratorEditingComponent implements OnChanges {
  administrator: Administrator;
  hireDate: Date = new Date();
  birthday: Date = new Date();
  visible: boolean = false;

  constructor(
    private adminService: AdministratorService,
    private datePipe: DatePipe
  ) {
    this.administrator = new Administrator('', '', '', '', '', '', '', 0, '');
  }
  ngOnChanges(): void {
    this.birthday = new Date(this.administrator.birthday);
    this.hireDate = new Date(this.administrator.hireDate);
  }

  showEditgToggle(id: any) {
    this.administrator._id = id;
    this.adminService
      .getAdministrator(this.administrator._id)
      .subscribe((data: any) => {
        this.administrator = data.data[0];
      });
    this.visible = !this.visible;
  }

  editAdministrator() {
    this.administrator.birthday = this.datePipe.transform(
      this.birthday,
      'yyyy-MM-dd'
    )!;
    this.administrator.hireDate = this.datePipe.transform(
      this.hireDate,
      'yyyy-MM-dd'
    )!;

    this.adminService
      .updateAdministrator(this.administrator)
      .subscribe((data: any) => {
        this.administrator = data.data;
        this.visible = false;
      });
  }
}
