import {Component, OnInit, ViewChild} from '@angular/core';
import {Employee} from "../../_models/employee";
import {UpdateComponent} from "../update/update.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  @ViewChild(UpdateComponent) child: UpdateComponent | undefined;
  userData:Employee|any;
  message:any[] = [];
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  visible:boolean = false;
  constructor(private empService:EmployeeService, private authService:AuthService) {
    if(localStorage.getItem('data') != null) {
      //this.userData = new Employee("","","","","", "", "", "","",0);
      this.userData = JSON.parse(localStorage.getItem('data') || '{}');
      this.userData.password = undefined;
      console.log(this.userData)
    }
  }


  //----------------------File Upload----------------------
  get f(){
    return this.myForm.controls;
  }

  onFileChange(event:any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }
  submit(){
    const formData = new FormData();
    formData.append('image', this.myForm.get('fileSource')?.value || '');
    formData.append('_id', this.userData._id);

    this.empService.updateEmployee(formData)
      .subscribe(res => {
        this.visible = false;
        this.empService.getEmployee(this.userData._id)
          .subscribe({
            next: (data: any) => {
              this.userData = data.data;
              localStorage.setItem('data', JSON.stringify(this.userData));
              localStorage.setItem('settings', this.userData.settings);
              localStorage.setItem('role', this.userData.role);
              this.authService.role = this.userData.role;
              this.authService.settings = this.userData.settings;
              this.authService.data = this.userData;
            }, error: (error) => {
              console.log(error);
            }
          })

      })
  }

  updateImage(){
    this.visible = true;
  }

  // ----------------------File Upload----------------------

  ngOnInit(): void {
    this.message = [
      { severity: 'warn', summary: 'Waning', detail: 'You Must Set Remaining Data To Do any operations' },
    ];
  }

  updateProfile() {
    this.child?.showUpdateDialog();
  }

  updateData(){
    this.empService.getEmployee(this.userData._id)
      .subscribe((data:any) => {
        this.userData = data.data;
        localStorage.setItem('data', JSON.stringify(this.userData));
        localStorage.setItem('settings', this.userData.settings);
      } , error => {
        console.log(error);
      })
  }

  logout() {
    localStorage.removeItem('data');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('settings');
    window.location.href = "/workers/login";
  }

}
