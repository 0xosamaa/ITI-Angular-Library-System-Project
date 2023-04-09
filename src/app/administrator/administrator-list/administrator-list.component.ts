import { AdministratorService } from 'src/app/services/administrator.service';
import { Administrator } from './../../_models/administrator';
import { Component, ViewChild } from '@angular/core';
import { AdministratorAddingComponent } from '../administrator-adding/administrator-adding.component';

@Component({
  selector: 'app-administrator-list',
  templateUrl: './administrator-list.component.html',
  styleUrls: ['./administrator-list.component.css'],
})
export class AdministratorListComponent {
  administratorList: Administrator[] = [];
  @ViewChild(AdministratorAddingComponent)
  addChild: AdministratorAddingComponent | undefined;

  constructor(private adminService: AdministratorService) {}

  ngOnInit() {
    this.adminService.getAllAdministrators().subscribe(
      (data: any) => {
        this.administratorList = data.data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  displayAddModel() {
    console.log(this.addChild);
    this.addChild?.showAddDialog();
  }
}
