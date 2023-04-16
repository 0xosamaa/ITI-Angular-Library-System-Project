import { Component, EventEmitter, Output } from '@angular/core';
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
  error:string='';
  @Output() memberAdded:EventEmitter<Member> = new EventEmitter<Member>();

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

      this.memberService.addMember(memberData).subscribe(
        (res)=>{
          let newMember:Member = this.memberForm.value;
          this.memberAdded.emit(newMember);
          this.flag = false;
        },
        (error)=>{
          console.log(error);
          // this.error = 'Error occured while adding this new member...';
          let errorMessage = error.error.message;
          if(errorMessage.includes('FullName Field Required...!')){
            this.memberForm.controls['fullName'].setErrors({
              required: true,
            })
          }

          if(errorMessage.includes('FullName must be string')){
            this.memberForm.controls['fullName'].setErrors({
              type: "FullName must be of type string...",
            })
          }
          /************* FullName Field Validation **************/

          if(errorMessage.includes('Email Required...!')){
            this.memberForm.controls['email'].setErrors({
              required: true
            })
          }

          if(errorMessage.includes("Email must be in email format 'example@example.com'...!")){
            this.memberForm.controls['email'].setErrors({
              type: "Email must be in email format 'example@example.com'...!"
            })
          }
          /************* Email Field Validation **************/

          if(errorMessage.includes("Password Required...!")){
            this.memberForm.controls['password'].setErrors({
              required: true
            })
          }

          if(errorMessage.includes("Password must be at least 8 chars, starts with capital char...!")){
            this.memberForm.controls['password'].setErrors({
              type: 'Password must be strong [starts with capital char, contains symblos and numbers]'
            })
          }
          /************* Password Field Validation **************/

          if(errorMessage.includes("Phone Number must be numbers only 'it must be a real mobile number'...!")){
            this.memberForm.controls['phoneNumber'].setErrors({
              type: 'Phone Number must be in mobile num format'
            })
          }
          /************* Phone Number Field Validation **************/

          if(errorMessage.includes("BirthDate must be in date format...!")){
            this.memberForm.controls['birthDate'].setErrors({
              type: 'Birth Date must be in Date format'
            })
          }
          /************* Birth Date Field Validation **************/
        }
      );
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
