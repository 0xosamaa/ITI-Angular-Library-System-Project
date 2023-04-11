import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
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
  administrator: Administrator;
  editFormGroup: FormGroup;
  hireDate: Date = new Date();
  birthday: Date = new Date();
  visible: boolean = false;

  @Input() currentAdmin: Administrator | null = null;

  constructor(
    private adminService: AdministratorService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private changeDetector: ChangeDetectorRef
  ) {
    this.administrator = new Administrator('', '', '', '', '', '', '', 0, '');
    this.editFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      hireDate: ['', [Validators.required]],
    });
  }

  ngOnChanges(): void {
    this.birthday = new Date(this.administrator.birthday);
    this.hireDate = new Date(this.administrator.hireDate);

    console.log(this.currentAdmin);
    this.editFormGroup.patchValue({
      firstName: this.currentAdmin?.firstName,
      lastName: this.currentAdmin?.lastName,
      email: this.currentAdmin?.email,
      salary: this.currentAdmin?.salary,
      birthday: this.currentAdmin?.birthday,
      hireDate: this.currentAdmin?.hireDate,
    });
    this.administrator = this.editFormGroup.value;
    this.changeDetector.detectChanges();
    console.log(this.editFormGroup.value);
  }

  showEditgToggle(id: any) {
    this.administrator._id = id;
    this.adminService
      .getAdministrator(this.administrator._id)
      .subscribe((data: any) => {
        this.administrator = data.data[0];
      });
    this.visible = !this.visible;
  }

  editAdministrator() {
    this.administrator.birthday = this.datePipe.transform(
      this.birthday,
      'yyyy-MM-dd'
    )!;
    this.administrator.hireDate = this.datePipe.transform(
      this.hireDate,
      'yyyy-MM-dd'
    )!;

    this.adminService
      .updateAdministrator(this.administrator)
      .subscribe((data: any) => {
        this.administrator = data.data;
        this.visible = false;
      });
  }
}
