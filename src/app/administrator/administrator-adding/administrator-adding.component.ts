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
    fromData.append('birthday', this.addFormGroup.get('birthday')?.value);
    fromData.append('hireDate', this.addFormGroup.get('hireDate')?.value);

    if (this.addFormGroup.get('image')?.value != undefined)
      fromData.append('image', this.addFormGroup.get('image')?.value);

    this.administrator = this.addFormGroup.value;

    this.adminService.addAdministrator(fromData).subscribe(
      (data: any) => {
        this.administrator!._id = data['data']['_id'];
        this.administratorHasBeenAdded.emit(this.administrator!);
        this.togglingAddDialog();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  togglingAddDialog() {
    this.visible = !this.visible;
  }
}
