import { AuthService } from './../../services/auth.service';
import { BookDetailsComponent } from './../book-details/book-details.component';
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
  @ViewChild(UpdateBookComponent) updateBook: UpdateBookComponent | undefined;
  @ViewChild(AddBookComponent) addBook: AddBookComponent | undefined;
  @ViewChild(BookDetailsComponent) bookDetails: BookDetailsComponent | undefined;
  loading: boolean = true;
  books: Book[] = [];
  book: Book = new Book();

  constructor(
    public bookService: BookService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.getBooks();
    this.bookService.bookAdded.subscribe((data: any) => {
      this.books.push(data.book);
    });
    this.bookService.bookUpdatedList.subscribe((book: Book) => {
      for(let i = 0; i < this.books.length; i++) {
        if (this.books[i]._id === book._id) {
          this.books[i] = book;
          break;
        }
      }
    });
  }

  private getBooks(): void {
    this.bookService.getBooks().subscribe(
      (data:any) => {
        this.books = data.books;
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
    return event.value;
  }

  showDialog(id: string) {
    this.bookDetails?.showDetailsDialog(id);
  }

  addDialog() {
    this.addBook?.showAddDialog();
  }

  updateDialog(id: string) {
    this.updateBook?.showUpdateDialog(id);
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
                this.books = data.books;
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
