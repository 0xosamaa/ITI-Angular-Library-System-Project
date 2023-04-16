import { Component, OnInit, ViewChild } from '@angular/core';
import { Administrator } from 'src/app/_models/administrator';
import { AdministratorService } from 'src/app/services/administrator.service';
import { AdministratorEditingComponent } from '../administrator-editing/administrator-editing.component';

@Component({
  selector: 'app-administrator-profile',
  templateUrl: './administrator-profile.component.html',
  styleUrls: ['./administrator-profile.component.css'],
})
export class AdministratorProfileComponent implements OnInit {
  image = 'https://loremflickr.com/320/320';
  loggedInAdmin: Administrator | null = null;
  visible = false;
  @ViewChild(AdministratorEditingComponent)
  editChild: AdministratorEditingComponent | undefined;

  constructor(private adminService: AdministratorService) {}
  ngOnInit(): void {
    let id = localStorage.getItem('id');

    this.adminService.getAdministrator(id!).subscribe({
      next: (data: any) => {
        this.loggedInAdmin = data.data[0];
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  displayEditModal() {
    this.editChild?.togglingEditModal();
  }

  editAdmin(editedAdmin: Administrator) {
    this.loggedInAdmin = editedAdmin;
  }
}
