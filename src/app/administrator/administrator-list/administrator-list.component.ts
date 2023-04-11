import { AdministratorService } from 'src/app/services/administrator.service';
import { Administrator } from './../../_models/administrator';
import {
  Component,
  ViewChild,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
export class AdministratorListComponent implements OnInit, OnChanges {
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
  ) {}
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

  displaydetailsModal(id: number) {
    this.wantedAdmin = this.administratorList[id];
    this.viewChild?.showDetails();
  }
  displayEditModal(id: number) {
    this.wantedAdmin = this.administratorList[id];
    this.addChild?.showAddDialog();
  }
  displayAddModel() {
    this.addChild?.showAddDialog();
  }
  // displayEditModal(id: any) {
  //   this.editChild?.showEditgToggle(id);
  // }
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
            this.adminService.getAllAdministrators().subscribe((data: any) => {
              this.administratorList = data.data;
            });
          },
          (error) => {
            console.log(error.error.message);
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
