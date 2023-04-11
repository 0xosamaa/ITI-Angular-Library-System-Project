import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Administrator } from 'src/app/_models/administrator';
import { AdministratorService } from 'src/app/services/administrator.service';

@Component({
  selector: 'app-administrator-adding',
  templateUrl: './administrator-adding.component.html',
  styleUrls: ['./administrator-adding.component.css'],
})
export class AdministratorAddingComponent {
  addFormGroup: FormGroup;
  administrator: Administrator;
  visible: boolean = false;

  constructor(
    private adminService: AdministratorService,
    private formBuilder: FormBuilder
  ) {
    this.administrator = new Administrator('', '', '', '', '', '', '', 0, '');
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

  showAddDialog() {
    this.visible = true;
  }

  addAdministrator() {
    this.administrator = this.addFormGroup.value;
    this.adminService.addAdministrator(this.administrator).subscribe(
      (data) => {
        this.showAddDialog();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
