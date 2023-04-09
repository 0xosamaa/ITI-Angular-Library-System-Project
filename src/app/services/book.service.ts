import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './../_models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  bookAdded: EventEmitter<Book> = new EventEmitter<Book>();

  constructor(
    public http: HttpClient,
    @Inject('baseURL') public baseURL: string
  ) {}

  getBooks() {
    return this.http.get(this.baseURL + '/books');
  }

  getBook(id: string) {
    return this.http.get(this.baseURL + '/books/id/' + id);
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

  updateBook(book: Book) {
    return this.http.patch(this.baseURL + '/books/id/' + book.id, book);
  }

  deleteBook(id: string) {
    return this.http.delete(this.baseURL + '/books/id/' + id);
  }
}
