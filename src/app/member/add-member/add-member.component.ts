import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
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
      fullName: [Validators.required, Validators.minLength(3)],
      email: [Validators.required, Validators.email],
      password: [Validators.required, Validators.minLength(8)],
      fullAddress: this.formBuilder.group({
        city:['',Validators.minLength(3)],
        street:['',Validators.minLength(3)],
        building:['',Validators.minLength(3)],
      })
    })
  }
   

  showForm(){
    this.flag = true;
  }

  store(){
    // this.flag = false;
    if (this.memberForm.valid) {
      this.flag = false;
      const memberData = this.memberForm.value;
      this.memberService.addMember(memberData);
      this.router.navigate(["/members"]);
    } else {
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
