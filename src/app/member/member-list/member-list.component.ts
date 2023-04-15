import { Component, OnInit, ViewChild } from '@angular/core';
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
  errors:string[]=[];
  loading:boolean = false;
  constructor(private memberService:MemberService){}

  ngOnInit(){
    this.memberService.getAllMembers().subscribe(
      (data:any)=>{
        this.members = data.data;
      },
      (error)=>{
        this.errors.push(error);
      }
    );
  }

  ngOnChange(){
    this.memberService.getAllMembers().subscribe(
      (data:any)=>{
        this.members = data.data;
        console.log(this.members)
      },
      (error)=>{
        this.errors.push(error);
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
    this.editNewMember?.showForm(member);
  }

  details(id:any){
    this.memberDetails?.showMemberDetials(id);
  }

  deleteSingleMember(id:any){
    this.deleteMember?.destroy(id);
  }


}
