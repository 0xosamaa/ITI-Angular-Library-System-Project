import { AdministratorService } from 'src/app/services/administrator.service';
import { Administrator } from './../../_models/administrator';
import { Component, ViewChild, OnChanges } from '@angular/core';
import { AdministratorAddingComponent } from '../administrator-adding/administrator-adding.component';
import { AdministratorDetailsComponent } from '../administrator-details/administrator-details.component';
import { AdministratorEditingComponent } from '../administrator-editing/administrator-editing.component';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
@Component({
  selector: 'app-administrator-list',
  templateUrl: './administrator-list.component.html',
  styleUrls: ['./administrator-list.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class AdministratorListComponent implements OnChanges {
  administratorList: Administrator[] = [];
  wantedAdmin: Administrator | null = null;

  @ViewChild(AdministratorAddingComponent)
  addChild: AdministratorAddingComponent | undefined;

  @ViewChild(AdministratorDetailsComponent)
  viewChild: AdministratorDetailsComponent | undefined;

  @ViewChild(AdministratorEditingComponent)
  editChild: AdministratorEditingComponent | undefined;

  constructor(
    private adminService: AdministratorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.adminService.getAllAdministrators().subscribe(
      (data: any) => {
        this.administratorList = data.data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnChanges(): void {
    this.adminService.getAllAdministrators().subscribe(
      (data: any) => {
        this.administratorList = data.data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  displaydetailsModal(selectedAdmin: Administrator) {
    this.wantedAdmin = selectedAdmin;
    this.viewChild?.showDetails();
  }
  displayEditModal(selectedAdmin: Administrator) {
    this.wantedAdmin = selectedAdmin;
    this.editChild?.togglingEditModal();
  }
  editingCurrentAdministrator(editedAdmin: Administrator) {
    let index = this.administratorList.findIndex(
      (admin) => admin._id === editedAdmin._id
    );
    this.administratorList[index] = editedAdmin;
  }

  displayAddModel() {
    this.addChild?.togglingAddDialog();
  }
  pushingNewAdministrator(newAdmin: Administrator) {
    this.administratorList.push(newAdmin);
  }

  confirm(id: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
        this.adminService.deleteAdministrator(id).subscribe(
          () => {
            let index = this.administratorList.findIndex(
              (admin) => admin._id === id
            );
            this.administratorList.splice(index, 1);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
}
