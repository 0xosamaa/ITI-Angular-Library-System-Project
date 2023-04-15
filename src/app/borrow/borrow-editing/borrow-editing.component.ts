import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Borrow } from 'src/app/_models/borrow';
import { BorrowService } from 'src/app/services/borrow.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-borrow-editing',
  templateUrl: './borrow-editing.component.html',
  styleUrls: ['./borrow-editing.component.css'],
})
export class BorrowEditingComponent implements OnChanges {
  editFormGroup: FormGroup;
  visible: boolean = false;

  @Input() currentBorrow: Borrow | null = null;
  @Output() borrowHasBeenEdited: EventEmitter<Borrow>;

  constructor(
    private borrowService: BorrowService,
    private formBuilder: FormBuilder
  ) {
    this.editFormGroup = this.formBuilder.group({
      _id: [''],
      bookID: ['', Validators.required],
      employeeID: ['', Validators.required],
      memberID: ['', Validators.required],
      borrowDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      deadlineDate: ['', Validators.required],
    });
    this.borrowHasBeenEdited = new EventEmitter<Borrow>();
  }

  ngOnChanges(): void {
    this.editFormGroup.patchValue({
      _id: this.currentBorrow?._id,
      bookID: this.currentBorrow?.bookID,
      employeeID: this.currentBorrow?.employeeID,
      memberID: this.currentBorrow?.memberID,
      borrowDate: new Date(this.currentBorrow!.borrowDate),
      returnDate: new Date(this.currentBorrow!.returnDate),
      deadlineDate: new Date(this.currentBorrow!.deadlineDate),
    });
  }

  togglingEditModal() {
    this.visible = !this.visible;
  }

  editBorrow() {
    let formData = new FormData();
    // formData.append('_id', this.editFormGroup.get('_id')?.value);
    formData.append('bookID', this.editFormGroup.get('bookID')?.value);
    formData.append('employeeID', this.editFormGroup.get('employeeID')?.value);
    formData.append('memberID', this.editFormGroup.get('memberID')?.value);
    formData.append(
      'borrowDate',
      this.editFormGroup.get('borrowDate')?.value.toISOString()
    );
    formData.append(
      'returnDate',
      this.editFormGroup.get('returnDate')?.value.toISOString()
    );

    this.borrowService.updateBorrow(formData).subscribe({
      next: (data: any) => {
        console.log(data);

        this.currentBorrow = this.editFormGroup.value;
        this.borrowHasBeenEdited.emit(this.currentBorrow!);
        this.togglingEditModal();
      },
      error: (error: any) => {
        // Showing the Validation Errors to user on Template
        let errorMessage = error.error.message;

        if (errorMessage.includes('Book ID is Required'))
          this.editFormGroup.controls['bookID'].setErrors({
            required: true,
          });

        if (errorMessage.includes('Employee ID is Required'))
          this.editFormGroup.controls['employeeID'].setErrors({
            required: true,
          });

        if (errorMessage.includes('Member ID is Required'))
          this.editFormGroup.controls['memberID'].setErrors({
            required: true,
          });

        if (errorMessage.includes('Borrow Date is Required'))
          this.editFormGroup.controls['borrowDate'].setErrors({
            required: true,
          });

        if (errorMessage.includes('Return Date is Required'))
          this.editFormGroup.controls['returnDate'].setErrors({
            required: true,
          });

        if (errorMessage.includes('Deadline Date is Required'))
          this.editFormGroup.controls['returnDate'].setErrors({
            required: true,
          });

        if (errorMessage.includes('Invalid value'))
          this.editFormGroup.controls['returnDate'].setErrors({
            format: 'Date must be in ISO format',
          });
      },
    });
  }
}
