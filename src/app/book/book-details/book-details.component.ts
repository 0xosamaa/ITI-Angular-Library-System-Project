import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/_models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book = new Book();
  visible: boolean = false;

  constructor(public bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.bookDetails.subscribe((book: Book) => {
      this.book = book;
    });
    this.bookService.showDetails.subscribe((visible: boolean) => {
      this.visible = visible;
    })
  }
  showDetailsDialog(id: string) {
    this.book = new Book();
    this.bookService.getBook(id);
  }
}
