import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Borrow } from 'src/app/_models/borrow';
import { BorrowService } from 'src/app/services/borrow.service';

@Component({
  selector: 'app-borrow-adding',
  templateUrl: './borrow-adding.component.html',
  styleUrls: ['./borrow-adding.component.css'],
})
export class BorrowAddingComponent {
  addFormGroup: FormGroup;
  borrow: Borrow | null = null;
  visible: boolean = false;
  @Output() borrowHasBeenAdded: EventEmitter<Borrow>;

  constructor(
    private borrowService: BorrowService,
    private formBuilder: FormBuilder
  ) {
    this.borrowHasBeenAdded = new EventEmitter<Borrow>();
    this.addFormGroup = this.formBuilder.group({
      bookID: ['', [Validators.required]],
      employeeID: ['', [Validators.required]],
      memberID: ['', [Validators.required]],
      borrowDate: ['', [Validators.required]],
      returnDate: [''],
      deadlineDate: ['', [Validators.required]],
    });
  }
  addBorrow() {
    let fromData = new FormData();
    fromData.append('bookID', this.addFormGroup.get('bookID')?.value);
    fromData.append('employeeID', this.addFormGroup.get('employeeID')?.value);
    fromData.append('memberID', this.addFormGroup.get('memberID')?.value);
    fromData.append(
      'borrowDate',
      this.addFormGroup.get('borrowDate')?.value.toISOString()
    );
    fromData.append(
      'returnDate',
      this.addFormGroup.get('returnDate')?.value.toISOString()
    );
    fromData.append(
      'deadlineDate',
      this.addFormGroup.get('deadlineDate')?.value.toISOString()
    );

    this.borrow = this.addFormGroup.value;

    this.borrowService.addBorrow(fromData).subscribe({
      next: (data: any) => {
        this.borrow!._id = data['data']['_id'];
        this.borrowHasBeenAdded.emit(this.borrow!);
        this.togglingAddDialog();
      },
      error: (error: any) => {
        // Showing the Validation Errors to user on Template
        let errorMessage = error.error.message;

        if (errorMessage.includes('Book ID is Required'))
          this.addFormGroup.controls['bookID'].setErrors({
            required: true,
          });

        if (errorMessage.includes('Employee ID is Required'))
          this.addFormGroup.controls['employeeID'].setErrors({
            required: true,
          });
        if (errorMessage.includes('Member ID is Required'))
          this.addFormGroup.controls['memberID'].setErrors({
            required: true,
          });

        if (errorMessage.includes('Borrow Date is Required'))
          this.addFormGroup.controls['borrowDate'].setErrors({
            required: true,
          });

        if (errorMessage.includes('Deadline Date is Required'))
          this.addFormGroup.controls['deadlineDate'].setErrors({
            required: true,
          });

        if (errorMessage.includes('Invalid value'))
          this.addFormGroup.controls['returnDate'].setErrors({
            format: 'Invalid Date Format',
          });
      },
    });
  }
  togglingAddDialog() {
    this.visible = !this.visible;
  }
}
