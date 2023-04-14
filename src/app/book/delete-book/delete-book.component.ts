import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class DeleteBookComponent {
  @Output() deletedBookId = new EventEmitter<string>();

  constructor(
    private bookService: BookService,
    private confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {}

  showDeleteDialog(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure to delete book?',
      header: 'Delete Book',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.bookService.deleteBook(id).subscribe(
          (data:any) => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Book deleted successfully' });
            this.bookService.deletedBookId.emit(id);
          },
          (error) => {
            console.log(error.error.message);
          }
        );
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Book Deletion rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Book Deletion cancelled' });
            break;
        }
      }
    });
  }
}
