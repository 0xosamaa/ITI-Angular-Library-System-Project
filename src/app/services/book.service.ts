import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './../_models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  book: Book = new Book();
  bookAdded: EventEmitter<Book> = new EventEmitter<Book>();
  bookUpdated: EventEmitter<Book> = new EventEmitter<Book>();
  bookDetails: EventEmitter<Book> = new EventEmitter<Book>();
  showDetails: EventEmitter<boolean> = new EventEmitter<boolean>();
  showUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public http: HttpClient,
    @Inject('baseURL') public baseURL: string
  ) {}

  getBooks() {
    return this.http.get(this.baseURL + '/books');
  }

  getBook(id: string) {
    this.http.get(this.baseURL + '/books/id/' + id).subscribe(
      (data:any) => {
        this.book = data.book;
        this.bookDetails.emit(this.book);
        this.showDetails.emit(true);
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

  showDialogUpdate(id: string) {
    this.http.get(this.baseURL + '/books/id/' + id).subscribe(
      (data:any) => {
        this.book = data.book;
        this.bookUpdated.emit(this.book);
        this.showUpdate.emit(true);
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

  searchBook(keyword: string) {
    return this.http.get(this.baseURL + '/books/search/' + keyword);
  }

  addBook(book: Book) {
    return this.http.post(this.baseURL + '/books', book).subscribe(
      (data) => {
        this.bookAdded.emit(book);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateBook(id: string, book: Book) {
    console.log(book);
    return this.http.patch(this.baseURL + '/books/id/' + id, book).subscribe(
      (data) => {
        this.bookUpdated.emit(book);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteBook(id: string) {
    return this.http.delete(this.baseURL + '/books/id/' + id);
  }
}
