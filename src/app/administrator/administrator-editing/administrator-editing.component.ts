import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Administrator } from 'src/app/_models/administrator';
import { AdministratorService } from 'src/app/services/administrator.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-administrator-editing',
  templateUrl: './administrator-editing.component.html',
  styleUrls: ['./administrator-editing.component.css'],
})
export class AdministratorEditingComponent implements OnChanges {
  editFormGroup: FormGroup;
  visible: boolean = false;
  email: string;

  @Input() currentAdmin: Administrator | null = null;
  @Output() administratorHasBeenEdited: EventEmitter<Administrator>;

  constructor(
    private adminService: AdministratorService,
    private formBuilder: FormBuilder
  ) {
    this.editFormGroup = this.formBuilder.group({
      _id: [''],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      hireDate: ['', [Validators.required]],
    });
    this.administratorHasBeenEdited = new EventEmitter<Administrator>();
    this.email = JSON.parse(localStorage.getItem('data') || '{}').email;
  }

  ngOnChanges(): void {
    this.editFormGroup.patchValue({
      _id: this.currentAdmin?._id,
      firstName: this.currentAdmin?.firstName,
      lastName: this.currentAdmin?.lastName,
      email: this.currentAdmin?.email,
      salary: this.currentAdmin?.salary,
      birthday: new Date(Date.parse(this.currentAdmin!.birthday)),
      hireDate: new Date(Date.parse(this.currentAdmin!.hireDate)),
    });
  }
  togglingEditModal() {
    this.visible = !this.visible;
  }
  uploadImage(event: any) {
    this.editFormGroup.addControl('image', new FormControl());
    this.editFormGroup.patchValue({
      image: event.target.files[0],
    });
  }
  editAdministrator() {
    let formData = new FormData();
    formData.append('_id', this.editFormGroup.get('_id')?.value);
    formData.append('firstName', this.editFormGroup.get('firstName')?.value);
    formData.append('lastName', this.editFormGroup.get('lastName')?.value);
    formData.append('email', this.editFormGroup.get('email')?.value);
    formData.append('password', this.editFormGroup.get('password')?.value);
    formData.append('salary', this.editFormGroup.get('salary')?.value);
    formData.append(
      'birthday',
      this.editFormGroup.get('birthday')?.value.toISOString()
    );
    formData.append(
      'hireDate',
      this.editFormGroup.get('hireDate')?.value.toISOString()
    );

    if (this.editFormGroup.get('image')?.value !== undefined)
      formData.append('image', this.editFormGroup.get('image')?.value);

    this.adminService.updateAdministrator(formData).subscribe({
      next: (data: any) => {
        this.currentAdmin = this.editFormGroup.value;
        this.administratorHasBeenEdited.emit(this.currentAdmin!);
        this.togglingEditModal();
        console.log('oooooooooooooooooooooooo');
      },
      error: (error: any) => {
        console.log('oooooooooooooooooooooooo');
        // Showing the Validation Errors to user on Template
        let errorMessage = error.error.message;

        if (errorMessage.includes('First Name is Required'))
          this.editFormGroup.controls['firstName'].setErrors({
            required: true,
            minLength: 2,
          });

        if (errorMessage.includes('Last Name is Required'))
          this.editFormGroup.controls['lastName'].setErrors({
            required: true,
            minLength: 2,
          });

        if (
          errorMessage.includes(
            'E11000 duplicate key error collection: test.administrators index: email_1 dup key: '
          )
        )
          this.editFormGroup.controls['email'].setErrors({
            duplication: 'Email must not be duplicated',
          });

        if (
          errorMessage.includes('Password must be between 8 and 20 characters')
        )
          this.editFormGroup.controls['password'].setErrors({
            required: true,
            minlength: 2,
            maxLength: 20,
          });

        if (errorMessage.includes('Salary must be a Number'))
          this.editFormGroup.controls['salary'].setErrors({
            type: 'salary must be number',
          });

        if (errorMessage.includes('Birthday must be in date format...!'))
          this.editFormGroup.controls['salary'].setErrors({
            format: 'Birthday must be in date format...!',
          });

        if (errorMessage.includes('Hire Date must be in date format...!'))
          this.editFormGroup.controls['salary'].setErrors({
            format: 'Hire Date must be in date format...!',
          });

        if (errorMessage.includes('Invalid value'))
          this.editFormGroup.controls['password'].setErrors({
            required: true,
            minlength: 2,
          });

        if (errorMessage.includes('Image must be a String'))
          this.editFormGroup.controls['image'].setErrors({
            format: 'wrong image format',
          });
      },
    });
  }
}
