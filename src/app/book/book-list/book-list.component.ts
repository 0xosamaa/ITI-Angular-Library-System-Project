import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Book } from 'src/app/_models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  loading: boolean = true;
  detailsVisible: boolean = false;
  books: Book[] = [];
  book: Book = new Book();

  constructor(public bookService: BookService) { }

  ngOnInit(): void {
    this.loading = false;
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
}
