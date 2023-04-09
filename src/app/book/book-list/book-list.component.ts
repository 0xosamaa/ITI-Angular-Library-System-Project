import { UpdateBookComponent } from './../update-book/update-book.component';
import { ConfirmEventType, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { BookService } from './../../services/book.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Book } from 'src/app/_models/book';
import { AddBookComponent } from "../add-book/add-book.component";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class BookListComponent implements OnInit {
  @ViewChild(UpdateBookComponent) child: UpdateBookComponent | undefined;
  @ViewChild(AddBookComponent) addChild: AddBookComponent | undefined;
  loading: boolean = true;
  detailsVisible: boolean = false;
  addVisible: boolean = false;
  updateVisible: boolean = false;
  books: Book[] = [];
  book: Book = new Book();

  constructor(
    public bookService: BookService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.getBooks();
  }

  private getBooks(): void {
    this.bookService.getBooks().subscribe(
      (data:any) => {
        this.books = data.books;
        console.log(this.books);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  clear(table: Table) {
    table.clear();
  }

  getEventValue(event: any) {
    console.log(event.value);
    return event.value;
  }

  showDialog(book: Book) {
    this.detailsVisible = true;
    this.book = book;
    console.log(this.book);
  }

  // updateDialog(book:Book) {
  //   this.book = book;
  //   this.child?.showUpdateDialog();
  // }

  addDialog() {
    this.addChild?.showAddDialog();
  }

  deleteDialog(_id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure to delete book?',
      header: 'Delete Book',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.bookService.deleteBook(_id).subscribe(
          (data:any) => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Book deleted successfully' });
            this.bookService.getBooks().subscribe(
              (data:any) => {
                this.books = data.data;
                console.log(this.books);
              },
              (error:any) => {
                console.log(error.error.message);
              }
            );
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
    this.getBooks();
  }
}
