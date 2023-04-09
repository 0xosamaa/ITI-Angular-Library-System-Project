import { Component, OnChanges, SimpleChanges } from '@angular/core';

import { BookService } from './../../services/book.service';
import { Book } from './../../_models/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnChanges {
  book: Book = new Book();
  visible: boolean = false;

  constructor(public bookService: BookService) {}

  ngOnChanges(): void {}

  showAddDialog() {
    this.visible = true;
  }

  add() {
    this.book.dateAdded = new Date();
    this.visible = false;
    this.bookService.addBook(this.book);
  }
}
