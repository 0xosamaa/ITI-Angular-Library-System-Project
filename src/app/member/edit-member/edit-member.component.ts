<<<<<<< HEAD
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
=======
import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
>>>>>>> dev
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
<<<<<<< HEAD
export class EditMemberComponent{
=======
export class EditMemberComponent implements OnChanges{
>>>>>>> dev

  message:EventEmitter<string> = new EventEmitter<string>;
  flag:boolean = false;
<<<<<<< HEAD
  @Input() memberData:Member | null = null;
  memberEditForm:FormGroup;
  isEditing = false;

  constructor(private formBuilder:FormBuilder, private memberService:MemberService, private router:Router){
=======
  @Input() memberData?:Member;
  memberEditForm:FormGroup;
  isEditing = false;

  constructor(
    private formBuilder:FormBuilder, 
    private memberService:MemberService, 
    private router:Router, 
    ){
>>>>>>> dev
    this.memberEditForm = this.formBuilder.group({
      fullName: ['',[Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.email]],
      phoneNumber: [1, [Validators.nullValidator]],
      birthDate: ['', Validators.required],
      image: ['', Validators.nullValidator]
    })
  }

  
  ngOnChanges(): void {
<<<<<<< HEAD
    console.log("test on change...")
    if (this.memberData) {
      let oldDate = this.memberData.birthDate || '';
      let dateFormat = new Date(oldDate);
      console.log(dateFormat)
      this.memberEditForm.setValue({
=======
    if (this.memberData) {
      let oldDate = this.memberData.birthDate || '';
      let dateFormat = new Date(oldDate);
      this.memberEditForm.patchValue({
>>>>>>> dev
        fullName: this.memberData.fullName,
        email: this.memberData.email,
        birthDate: dateFormat,
        phoneNumber: this.memberData?.phoneNumber,
        image: this.memberData?.image
      });
      this.isEditing = true;
    } else {
      this.memberEditForm.reset();
      this.isEditing = false;
    }
<<<<<<< HEAD
  }

  showForm(){
    this.flag = true;
    // this.memberData = member;
    console.log(this.memberData);
  }

  update(){
=======
  }

  showForm(){
    this.flag = true;
  }

  update(){  
>>>>>>> dev
    if (this.memberEditForm.valid) {
      this.flag = false;
      let memberNewData = new FormData();
      memberNewData.append('_id', this.memberData?._id || '');
      memberNewData.append('fullName', this.memberEditForm.get('fullName')?.value);
      memberNewData.append('email', this.memberEditForm.get('email')?.value);
      
<<<<<<< HEAD
      if(this.memberEditForm.get('phoneNumber') !== undefined){
=======
      if(this.memberEditForm.get('phoneNumber')?.value != null){
>>>>>>> dev
        const phoneNumberString = this.memberEditForm.get('phoneNumber')?.value.toString();
        const phoneNumberDigitsOnly = phoneNumberString.replace(/\D/g, '');

        memberNewData.append('phoneNumber', phoneNumberDigitsOnly);
      }
<<<<<<< HEAD
      if(this.memberEditForm.get('birthDate') !== undefined){
        memberNewData.append('birthDate', this.memberEditForm.get('birthDate')?.value.toISOString());
      }
      if(this.memberEditForm.get('image') !== undefined){
        memberNewData.append('image', this.memberEditForm.get('image')?.value);
      }

      this.memberService.updateMember(memberNewData);
      this.router.navigate(["/members"]);
=======
      if(this.memberEditForm.get('birthDate')?.value !== undefined){
        memberNewData.append('birthDate', this.memberEditForm.get('birthDate')?.value.toISOString());
      }
      if(this.memberEditForm.get('image')?.value !== undefined){
        memberNewData.append('image', this.memberEditForm.get('image')?.value);
      }

      this.memberService.updateMember(memberNewData).subscribe(
        (res)=>{
          console.log(res);
        },
        (error)=>{
        }
      );
      // this.router.navigate(["/members"]);
>>>>>>> dev
    }else {
      // show error messages
      Object.keys(this.memberEditForm.controls).forEach(field => {
        const control = this.memberEditForm.get(field);
        if(control){

          if(control instanceof FormGroup){
            Object.keys(control.controls).forEach(innerField=>{
              const innerControl = control.get(innerField);
              if(innerControl?.invalid){
                innerControl.markAsDirty();
              }
            });
          }else{
            if (control.invalid) {
              control.markAsDirty();
              control.markAsTouched();
            }
          }

        }
      });
    }
  }
}


export const phoneNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const phoneNumber = control.get('phoneNumber')?.value;
  const regex = /^\d{10}$/;
  if (!regex.test(phoneNumber)) {
    return { phoneNumberInvalid: true };
  }
  return null;
};

