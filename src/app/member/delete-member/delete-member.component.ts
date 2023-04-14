import { Component } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-delete-member',
  templateUrl: './delete-member.component.html',
  styleUrls: ['./delete-member.component.css']
})
export class DeleteMemberComponent {
  flag:boolean = true;
  constructor(private memberService:MemberService){}

  showConfirm(){
    this.flag = true;
  }
  
  deleteMember(id:string){
    this.memberService.deleteMember(id);
  }
}
