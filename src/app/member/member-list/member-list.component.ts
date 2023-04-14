import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/services/member.service';
import { AddMemberComponent } from '../add-member/add-member.component';
import { MemberDetailsComponent } from '../member-details/member-details.component';
import { DeleteMemberComponent } from '../delete-member/delete-member.component';
import { ConfirmEventType, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
 
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class MemberListComponent implements OnInit{
  @ViewChild(AddMemberComponent) addNewMember:AddMemberComponent | undefined;
  @ViewChild(MemberDetailsComponent) memberDetails:MemberDetailsComponent | undefined;
  @ViewChild(DeleteMemberComponent) deleteMember:DeleteMemberComponent | undefined;

  members:Member[]=[];
  loading:boolean = false;
  constructor(public memberService:MemberService,public confirmationService:ConfirmationService, public messageService: MessageService){}

  ngOnInit(){
    this.memberService.getAllMembers().subscribe((data:any)=>{
      this.members = data.data;
      console.log(this.members)
    })
  }

  ngOnChange(){
    this.memberService.getAllMembers().subscribe((data:any)=>{
      this.members = data.data;
      console.log(this.members)
    })
  }

  addForm(){
    this.addNewMember?.showForm();
  }

  store(){
    this.addNewMember?.store();
  }

  details(id:string){
    this.memberDetails?.showMemberDetials(id);
  }

  deleteSingleMember(id:string){
    this.deleteMember?.showConfirm();
      // this.confirmationService.confirm({
      //   message: 'Are you sure to delete book?',
      //   header: 'Delete Book',
      //   icon: 'pi pi-info-circle',
      //   accept: () => {
      //     this.deleteMember?.deleteMember(id);
      //   },
      //   reject: (type: any) => {
      //   }
      // });
  }


}
