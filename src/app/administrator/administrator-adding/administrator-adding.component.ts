import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Administrator } from 'src/app/_models/administrator';
import { AdministratorService } from 'src/app/services/administrator.service';

@Component({
  selector: 'app-administrator-adding',
  templateUrl: './administrator-adding.component.html',
  styleUrls: ['./administrator-adding.component.css'],
})
export class AdministratorAddingComponent {
  addFormGroup: FormGroup;
  administrator: Administrator | null = null;
  visible: boolean = false;
  @Output() administratorHasBeenAdded: EventEmitter<Administrator>;

  constructor(
    private adminService: AdministratorService,
    private formBuilder: FormBuilder
  ) {
    this.administratorHasBeenAdded = new EventEmitter<Administrator>();
    this.addFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]],
      salary: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      hireDate: ['', [Validators.required]],
    });
  }
  uploadImage(event: any) {
    this.addFormGroup.addControl('image', new FormControl());
    this.addFormGroup.patchValue({
      image: event.target.files[0],
    });
  }
  addAdministrator() {
    let fromData = new FormData();
    fromData.append('firstName', this.addFormGroup.get('firstName')?.value);
    fromData.append('lastName', this.addFormGroup.get('lastName')?.value);
    fromData.append('email', this.addFormGroup.get('email')?.value);
    fromData.append('password', this.addFormGroup.get('password')?.value);
    fromData.append('salary', this.addFormGroup.get('salary')?.value);
    fromData.append(
      'birthday',
      this.addFormGroup.get('birthday')?.value.toISOString()
    );
    fromData.append(
      'hireDate',
      this.addFormGroup.get('hireDate')?.value.toISOString()
    );

    if (this.addFormGroup.get('image')?.value !== undefined)
      fromData.append('image', this.addFormGroup.get('image')?.value);

    this.administrator = this.addFormGroup.value;

    this.adminService.addAdministrator(fromData).subscribe({
      next: (data: any) => {
        this.administrator!._id = data['data']['_id'];
        this.administratorHasBeenAdded.emit(this.administrator!);
        this.togglingAddDialog();
      },
      error: (error: any) => {
        // Showing the Validation Errors to user on Template
        let errorMessage = error.error.message;

        if (errorMessage.includes('First Name is Required'))
          this.addFormGroup.controls['firstName'].setErrors({
            required: true,
            minLength: 2,
          });

        if (errorMessage.includes('Last Name is Required'))
          this.addFormGroup.controls['lastName'].setErrors({
            required: true,
            minLength: 2,
          });

        if (
          errorMessage.includes(
            'E11000 duplicate key error collection: test.administrators index: email_1 dup key: '
          )
        )
          this.addFormGroup.controls['email'].setErrors({
            duplication: 'Email must not be duplicated',
          });

        if (
          errorMessage.includes('Password must be between 8 and 20 characters')
        )
          this.addFormGroup.controls['password'].setErrors({
            required: true,
            minlength: 2,
            maxLength: 20,
          });

        if (errorMessage.includes('Salary must be a Number'))
          this.addFormGroup.controls['salary'].setErrors({
            type: 'salary must be number',
          });

        if (errorMessage.includes('Birthday must be in date format...!'))
          this.addFormGroup.controls['salary'].setErrors({
            format: 'Birthday must be in date format...!',
          });

        if (errorMessage.includes('Hire Date must be in date format...!'))
          this.addFormGroup.controls['salary'].setErrors({
            format: 'Hire Date must be in date format...!',
          });

        if (errorMessage.includes('Invalid value'))
          this.addFormGroup.controls['password'].setErrors({
            required: true,
            minlength: 2,
          });

        if (errorMessage.includes('Image must be a String'))
          this.addFormGroup.controls['image'].setErrors({
            format: 'wrong image format',
          });
      },
    });
  }
  togglingAddDialog() {
    this.visible = !this.visible;
  }
}
