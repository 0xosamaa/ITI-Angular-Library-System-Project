import { Component } from '@angular/core';
import { BorrowService } from '../services/borrow.service';
import { EmployeeService } from '../services/employee.service';
import { BookService } from "../services/book.service";

@Component({
  selector: 'app-borrows',
  templateUrl: './borrows.component.html',
  styleUrls: ['./borrows.component.css'],
})
export class BorrowsComponent {
  borrows = [];
  books = [];
  employees = [];
  members = [];

  constructor(
    public borrowService: BorrowService,
    public employeeService: EmployeeService,
    public bookService: BookService,
  ) {}

  ngOnInit(): void {
    this.getBorrows();
  }

  private getBorrows(): void {
    this.borrowService.getBorrows().subscribe({
      next: (data: any) => {
        this.borrows = data.results;
        console.log(this.borrows);
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });

    this.employeeService.getEmployees().subscribe({
      next: (data: any) => {
        this.employees = data.results;
        console.log(this.employees);
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });

    this.bookService.getBooks().subscribe({
      next: (data: any) => {
        this.books = data.results;
        console.log(this.books);
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
    this.bookService.getBooks().subscribe({
      next: (data: any) => {
        this.books = data.results;
        console.log(this.books);
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
}
