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
import { DeleteBookComponent } from './../delete-book/delete-book.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class BookListComponent implements OnInit {
  @ViewChild(BookDetailsComponent) bookDetails: BookDetailsComponent | undefined;
  @ViewChild(AddBookComponent) addBook: AddBookComponent | undefined;
  @ViewChild(UpdateBookComponent) updateBook: UpdateBookComponent | undefined;
  @ViewChild(DeleteBookComponent) deleteBook: DeleteBookComponent | undefined;
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
    this.bookService.deletedBookId.subscribe((id: string) => {
      for(let i = 0; i < this.books.length; i++) {
        if (this.books[i]._id === id) {
          this.books.splice(i, 1);
          break;
        }
      }
    })
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

  deleteDialog(id: string) {
    this.deleteBook?.showDeleteDialog(id);
  }
}
