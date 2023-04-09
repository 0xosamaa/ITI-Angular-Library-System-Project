import { BookService } from './../../services/book.service';
import { Book } from './../../_models/book';
import { Component, OnChanges, SimpleChanges } from '@angular/core';

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
    // this.employee.birthDate = this.birthDate.toISOString();
    // this.employee.hireDate = this.hireDate.toISOString();
    // this.employee.settings = this.setting.code;
    this.book.dateAdded = new Date();
    this.bookService.addBook(this.book).subscribe(
      (data:any) => {
        this.visible = false;
        window.location.reload();
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
}
