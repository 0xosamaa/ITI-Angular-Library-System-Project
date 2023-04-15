import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/_models/book';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  book: Book = new Book();
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

  ngOnInit(): void {
    this.bookService.bookUpdated.subscribe((book: Book) => {
      this.book = book;
      this.bookForm.setValue({
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        datePublished: new Date(book.datePublished?.toString() || ""),
        category: book.category,
        pagesCount: book.pagesCount,
        copiesCount: book.copiesCount,
        isAvailable: book.isAvailable,
        shelfNo: book.shelfNo
      })
    });
    this.bookService.showUpdate.subscribe((visible: boolean) => {
      this.visible = visible;
    })
  }

  showUpdateDialog(id: string) {
    this.bookService.showDialogUpdate(id);
  }

  onDialogHide() {
    this.submitted = false;
    this.bookForm.reset();
    this.bookForm.setValue({
      title: this.book.title,
      author: this.book.author,
      publisher: this.book.publisher,
      datePublished: new Date(this.book.datePublished?.toString() || ""),
      category: this.book.category,
      pagesCount: this.book.pagesCount,
      copiesCount: this.book.copiesCount,
      isAvailable: this.book.isAvailable,
      shelfNo: this.book.shelfNo
    })
  }

  update() {
    this.submitted = true;
    if (this.bookForm.valid) {
      const formValues = this.bookForm.value;
      this.bookService.updateBook(this.book._id, new Book(
        this.book._id,
        formValues.title,
        formValues.author,
        formValues.publisher,
        this.book.dateAdded,
        formValues.datePublished,
        formValues.category,
        formValues.pagesCount,
        formValues.copiesCount,
        formValues.isAvailable,
        formValues.shelfNo
      ));
      this.visible = false;
      this.submitted = false;
    }
  }
}
