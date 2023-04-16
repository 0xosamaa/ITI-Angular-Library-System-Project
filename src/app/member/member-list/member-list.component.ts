import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/services/member.service';
import { AddMemberComponent } from '../add-member/add-member.component';
import { MemberDetailsComponent } from '../member-details/member-details.component';
import { DeleteMemberComponent } from '../delete-member/delete-member.component';
import { EditMemberComponent } from '../edit-member/edit-member.component';
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit{
  @ViewChild(AddMemberComponent) addNewMember:AddMemberComponent | undefined;
  @ViewChild(EditMemberComponent) editNewMember:EditMemberComponent | undefined;
  @ViewChild(MemberDetailsComponent) memberDetails:MemberDetailsComponent | undefined;
  @ViewChild(DeleteMemberComponent) deleteMember:DeleteMemberComponent | undefined;

  members:Member[]=[];
  memberData:Member;
  message:string='';
  loading:boolean = false;
  error:string='';
  constructor(private memberService:MemberService){
    this.memberData = new Member();
  }

  ngOnInit(){
    this.memberService.getAllMembers().subscribe(
      (data:any)=>{
        this.members = data.data;
      },
      (error)=>{
        this.message = 'An error occurred while loading the data. Please try again later.';
      }
    );
  }

  ngOnChange(){
    this.memberService.getAllMembers().subscribe(
      (data:any)=>{
        this.members = data.data;
      },
      (error)=>{
        this.message = 'An error occurred while loading the data. Please try again later.';
      }
    );
  }

  addForm(){
    this.addNewMember?.showForm();
  }

  store(){
    this.addNewMember?.store();
  }

  update(member:Member){
    this.memberData = member;
    this.editNewMember?.showForm();
  }

  details(id:any){
    this.memberDetails?.showMemberDetials(id);
  }

  deleteSingleMember(id:any){
    this.deleteMember?.destroy(id);
  }


}
