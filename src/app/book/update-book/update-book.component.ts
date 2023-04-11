import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/_models/book';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  book: Book = new Book();
  book_id: string = "";
  visible: boolean = false;

  constructor(public bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.bookUpdated.subscribe((book: Book) => {
      this.book = book;
    });
    this.bookService.showUpdate.subscribe((visible: boolean) => {
      this.visible = visible;
    })
  }

  showUpdateDialog(id: string) {
    this.book_id = id;
    this.bookService.showDialogUpdate(id);
  }

  update() {
    this.visible = false;
    this.bookService.updateBook(this.book_id, new Book(
      this.book_id,
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
  }
}
