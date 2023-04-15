import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit{
  memberDetails:Member = new Member();
  flag:boolean = false;

  constructor(private memberService:MemberService){}

  ngOnInit(){
    this.memberService.memberDetails.subscribe((data:any)=>{
      this.memberDetails = data;
    })
  }

  showMemberDetials(id:string){
    this.flag = true;
    this.memberService.getMember(id);
    console.log(this.memberDetails);
  }
}
