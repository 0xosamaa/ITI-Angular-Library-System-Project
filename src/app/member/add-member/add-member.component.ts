import { Component } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent {
  flag:boolean = false;
  memberForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private memberService:MemberService, private router:Router){
    this.memberForm = this.formBuilder.group({
      fullName: ['',[Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      phoneNumber: [1, [Validators.nullValidator]],
      birthDate: ['', Validators.required],
      image: ['', Validators.nullValidator]
    })
  }
   

  showForm(){
    this.flag = true;
  }

  store(){
    if (this.memberForm.valid) {
      this.flag = false;
      let memberData = new FormData();
      memberData.append('fullName', this.memberForm.get('fullName')?.value);
      memberData.append('password', this.memberForm.get('password')?.value);
      memberData.append('email', this.memberForm.get('email')?.value);
      
      if(this.memberForm.get('phoneNumber') !== undefined){
        const phoneNumberString = this.memberForm.get('phoneNumber')?.value.toString();
        const phoneNumberDigitsOnly = phoneNumberString.replace(/\D/g, '');

        memberData.append('phoneNumber', phoneNumberDigitsOnly);
      }
      if(this.memberForm.get('birthDate') !== undefined){
        memberData.append('birthDate', this.memberForm.get('birthDate')?.value.toISOString());
      }
      if(this.memberForm.get('image') != undefined){
        memberData.append('image', this.memberForm.get('image')?.value);
      }

      this.memberService.addMember(memberData);
      this.router.navigate(["/members"]);
    }else {
      // show error messages
      Object.keys(this.memberForm.controls).forEach(field => {
        const control = this.memberForm.get(field);
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
