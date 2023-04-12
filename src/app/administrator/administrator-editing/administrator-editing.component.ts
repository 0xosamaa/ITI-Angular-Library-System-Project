import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Administrator } from 'src/app/_models/administrator';
import { AdministratorService } from 'src/app/services/administrator.service';
import { DatePipe } from '@angular/common';
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

  @Input() currentAdmin: Administrator | null = null;
  @Output() administratorHasBeenEdited: EventEmitter<Administrator>;

  constructor(
    private adminService: AdministratorService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.editFormGroup = this.formBuilder.group({
      _id: [''],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: undefined,
      salary: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      hireDate: ['', [Validators.required]],
    });
    this.administratorHasBeenEdited = new EventEmitter<Administrator>();
  }

  ngOnChanges(): void {
    this.editFormGroup.patchValue({
      _id: this.currentAdmin?._id,
      firstName: this.currentAdmin?.firstName,
      lastName: this.currentAdmin?.lastName,
      email: this.currentAdmin?.email,
      salary: this.currentAdmin?.salary,
      birthday: new Date(Date.parse(this.currentAdmin!.hireDate)),
      hireDate: new Date(Date.parse(this.currentAdmin!.birthday)),
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
    this.currentAdmin = this.editFormGroup.value;

    this.currentAdmin!.birthday = this.datePipe.transform(
      this.currentAdmin!.birthday,
      'yyyy-MM-dd'
    )!;
    this.currentAdmin!.hireDate = this.datePipe.transform(
      this.currentAdmin!.hireDate,
      'yyyy-MM-dd'
    )!;
    this.currentAdmin!['password'] = undefined;
    // this.currentAdmin?.image = formData.get("image")["name"]
    let formData = new FormData();
    formData.append('_id', this.currentAdmin!['_id']);
    formData.append('firstName', this.currentAdmin!['firstName']);
    formData.append('lastName', this.currentAdmin!['lastName']);
    formData.append('email', this.currentAdmin!['email']);
    formData.append('password', this.currentAdmin!['password']);
    formData.append('salary', this.currentAdmin!['salary'].toString());
    formData.append('birthday', this.currentAdmin!['birthday']);
    formData.append('hireDate', this.currentAdmin!['hireDate']);
    formData.append('image', this.editFormGroup.get('image')?.value);

    this.adminService.updateAdministrator(formData).subscribe((data: any) => {
      this.administratorHasBeenEdited.emit(this.currentAdmin!);
      this.togglingEditModal();
    });
  }
}
