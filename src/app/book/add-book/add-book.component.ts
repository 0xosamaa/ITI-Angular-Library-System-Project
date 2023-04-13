import { Component } from '@angular/core';

import { BookService } from './../../services/book.service';
import { Book } from './../../_models/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  book: Book = new Book();
  visible: boolean = false;

  constructor(public bookService: BookService) {}

  showAddDialog() {
    this.visible = true;
  }

  add() {
    this.book.dateAdded = new Date();
    this.visible = false;
    this.bookService.addBook(new Book(
      this.book._id,
      this.book.title,
      this.book.author,
      this.book.publisher,
      this.book.dateAdded,
      this.book.datePublished,
      this.book.category,
      this.book.pagesCount,
      this.book.copiesCount,
      this.book.isAvailable,
      this.book.shelfNo
    ));
    this.book = new Book();
  }
}
