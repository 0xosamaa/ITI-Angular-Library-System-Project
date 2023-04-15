import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Employee } from '../../_models/employee';
import { EmployeeService } from '../../services/employee.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent {
  @Output() updated: EventEmitter<string> = new EventEmitter<string>();
  @Input() employee: Employee | null = null;
  @Input() user: string;
  visible: boolean = false;
  addFormGroup: FormGroup;
  birthDate: Date | null = null;
  hireDate: Date | null = null;

  constructor(private empService: EmployeeService,private formBuilder: FormBuilder,private authService: AuthService) {
    this.user = '';
    this.addFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]],
      salary: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      hireDate: ['', [Validators.required]],
      settings: ['', [Validators.required]],
    });
  }

  ngOnChanges(): void {
    let birthdate = this.employee?.birthDate || '';
    let hireDate = this.employee?.hireDate || '';
    this.birthDate = new Date(birthdate);
    this.hireDate = new Date(hireDate);
    this.addFormGroup.patchValue({
      firstName: this.employee?.firstName,
      lastName: this.employee?.lastName,
      email: this.employee?.email,
      salary: this.employee?.salary,
      birthday: this.birthDate,
      hireDate: this.hireDate,
    });

  }


  showUpdateDialog() {
    this.visible = true;
  }

  uploadImage(event: any) {
    this.addFormGroup.addControl('image', new FormControl());
    this.addFormGroup.patchValue({
      image: event.target.files[0],
    });
  }

  selectSetting(event: any) {
    this.addFormGroup.addControl('settings', new FormControl());
    this.addFormGroup.patchValue({
      settings: event.target.value,
    });
    }


  save() {
    let formData = new FormData();
    formData.append('_id', this.employee?._id || '');
    formData.append('firstName', this.addFormGroup.get('firstName')?.value);
    formData.append('lastName', this.addFormGroup.get('lastName')?.value);
    formData.append('email', this.addFormGroup.get('email')?.value);
    if (this.addFormGroup.get('password')?.value !== undefined && this.addFormGroup.get('password')?.value !== '')
      formData.append('password', this.addFormGroup.get('password')?.value);
    formData.append('salary', this.addFormGroup.get('salary')?.value);
    formData.append('birthDate', this.addFormGroup.get('birthday')?.value.toISOString());
    formData.append('hireDate', this.addFormGroup.get('hireDate')?.value.toISOString());
    if (this.addFormGroup.get('image')?.value !== undefined)
      formData.append('image', this.addFormGroup.get('image')?.value);

    if (this.addFormGroup.get('settings')?.value !== '')
      formData.append('settings', this.addFormGroup.get('settings')?.value);


    this.empService.updateEmployee(formData).subscribe({
      next:(data: any) => {
        this.updated.emit('updated');
        this.visible = false;
      },
      error:(error) => {
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
