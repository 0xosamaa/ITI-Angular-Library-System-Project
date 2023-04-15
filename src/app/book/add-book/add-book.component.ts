import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BookService } from './../../services/book.service';
import { Book } from './../../_models/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  bookForm: FormGroup;
  visible: boolean = false;
  submitted = false;

  constructor(public bookService: BookService, private formBuilder: FormBuilder) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publisher: ['', Validators.required],
      datePublished: ['', Validators.required],
      category: ['', Validators.required],
      pagesCount: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(1800)
      ]],
      copiesCount: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ]],
      isAvailable: new FormControl(true),
      shelfNo: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ]]
    });
  }

  showAddDialog() {
    this.visible = true;
  }

  onDialogHide() {
    this.submitted = false;
    this.bookForm.reset();
    this.bookForm.setValue({
      title: '',
      author: '',
      publisher: '',
      datePublished: '',
      category: '',
      pagesCount: 1,
      copiesCount: 1,
      isAvailable: true,
      shelfNo: 1
    })
  }

  add() {
    this.submitted = true;
    if (this.bookForm.valid) {
      let dateAdded = new Date();
      const formValues = this.bookForm.value;
      const book = new Book(
        "",
        formValues.title,
        formValues.author,
        formValues.publisher,
        dateAdded,
        formValues.datePublished,
        formValues.category,
        formValues.pagesCount,
        formValues.copiesCount,
        formValues.isAvailable,
        formValues.shelfNo
      );
      this.visible = false;
      this.submitted = false;
      this.bookService.addBook(book);
    }
  }
}
