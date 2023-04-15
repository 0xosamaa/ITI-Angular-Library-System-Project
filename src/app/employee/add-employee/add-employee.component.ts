import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Employee} from "../../_models/employee";
import {EmployeeService} from "../../services/employee.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  @Output()
  Added: EventEmitter<string> = new EventEmitter<string>();

  addFormGroup: FormGroup;
  employee:Employee | null = null;
  visible:boolean = false;


  constructor(private empService:EmployeeService,private formBuilder: FormBuilder) {
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

  /*ngOnChanges(): void {
    this.birthDate = new Date(this.employee.birthDate);
    this.hireDate = new Date(this.employee.hireDate);

  }*/

  showAddDialog() {
    this.visible = true;
  }

  uploadImage(event: any) {
    this.addFormGroup.addControl('image', new FormControl());
    this.addFormGroup.patchValue({
      image: event.target.files[0],
    });
  }

  save() {
    let formData = new FormData();
    formData.append('firstName', this.addFormGroup.get('firstName')?.value);
    formData.append('lastName', this.addFormGroup.get('lastName')?.value);
    formData.append('email', this.addFormGroup.get('email')?.value);
    formData.append('password', this.addFormGroup.get('password')?.value);
    formData.append('salary', this.addFormGroup.get('salary')?.value);
    formData.append('birthDate', this.addFormGroup.get('birthday')?.value.toISOString());
    formData.append('hireDate', this.addFormGroup.get('hireDate')?.value.toISOString());
    if (this.addFormGroup.get('image')?.value !== undefined)
      formData.append('image', this.addFormGroup.get('image')?.value);

    this.empService.addEmployee(formData).subscribe({
      next: (data: any) => {
        this.visible = false;
        this.Added.emit('Added');
      },
    error:(error) =>
    {
      let errorMessage = error.error.message;

      if (errorMessage.includes('First name must be between 3 and 20 characters'))
        this.addFormGroup.controls['firstName'].setErrors({
          required: true,
          minLength: 2,
        });

      if (errorMessage.includes('Last name must be between 3 and 20 characters'))
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
        errorMessage.includes(
          'Email is not valid'
        )
      )
        this.addFormGroup.controls['email'].setErrors({
          duplication: 'Email is not valid',
        });
      if (
        errorMessage.includes('Password must be between 8 and 20 characters')
      )
        this.addFormGroup.controls['password'].setErrors({
          required: true,
          minlength: 2,
          maxLength: 20,
        });

      if (errorMessage.includes('Salary is not valid'))
        this.addFormGroup.controls['salary'].setErrors({
          type: 'salary must be number',
        });

      if (errorMessage.includes('Birth date is not valid'))
        this.addFormGroup.controls['salary'].setErrors({
          format: 'Birthday must be in date format...!',
        });

      if (errorMessage.includes('Hire date is not valid'))
        this.addFormGroup.controls['salary'].setErrors({
          format: 'Hire Date must be in date format...!',
        });

      if (errorMessage.includes('Invalid value'))
        this.addFormGroup.controls['password'].setErrors({
          required: true,
          minlength: 2,
        });
    }
  });
  }
}

