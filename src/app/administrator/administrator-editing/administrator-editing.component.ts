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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      password: undefined,
      salary: this.currentAdmin?.salary,
      birthday: this.currentAdmin?.birthday,
      hireDate: this.currentAdmin?.hireDate,
    });
  }
  togglingEditModal() {
    this.visible = !this.visible;
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

    this.adminService
      .updateAdministrator(this.currentAdmin!)
      .subscribe((data: any) => {
        this.administratorHasBeenEdited.emit(this.currentAdmin!);
        this.togglingEditModal();
      });
  }
}
