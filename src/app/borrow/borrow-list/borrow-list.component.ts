import { BorrowService } from 'src/app/services/borrow.service';
import { Borrow } from './../../_models/borrow';
import {
  Component,
  ViewChild,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BorrowAddingComponent } from '../borrow-adding/borrow-adding.component';
import { BorrowDetailsComponent } from '../borrow-details/borrow-details.component';
import { BorrowEditingComponent } from '../borrow-editing/borrow-editing.component';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class BorrowListComponent implements OnInit, OnChanges {
  borrowList: Borrow[] = [];
  wantedBorrow: Borrow | null = null;

  @ViewChild(BorrowAddingComponent)
  addChild: BorrowAddingComponent | undefined;
  @ViewChild(BorrowDetailsComponent)
  viewChild: BorrowDetailsComponent | undefined;
  @ViewChild(BorrowEditingComponent)
  editChild: BorrowEditingComponent | undefined;

  constructor(
    private borrowService: BorrowService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnChanges(): void {
    this.borrowService.getAllBorrows().subscribe(
      (data: any) => {
        this.borrowList = data.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.borrowService.getAllBorrows().subscribe(
      (data: any) => {
        this.borrowList = data.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  displayDetailsModal(selectedBorrow: Borrow) {
    this.wantedBorrow = selectedBorrow;
    this.viewChild?.showDetails();
  }

  displayEditModal(selectedBorrow: Borrow) {
    this.wantedBorrow = selectedBorrow;
    this.editChild?.togglingEditModal();
  }

  editingCurrentBorrow(editedBorrow: Borrow) {
    let index = this.borrowList.findIndex(
      (borrow) => borrow._id === editedBorrow._id
    );
    this.borrowList[index] = editedBorrow;
  }

  displayAddModel() {
    this.addChild?.togglingAddDialog();
  }

  pushingNewBorrow(newBorrow: Borrow) {
    this.borrowList.push(newBorrow);
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
        this.borrowService.deleteBorrow(id).subscribe(
          () => {
            let index = this.borrowList.findIndex(
              (borrow) => borrow._id === id
            );
            this.borrowList.splice(index, 1);
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

