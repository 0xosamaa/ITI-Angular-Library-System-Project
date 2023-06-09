import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { ConfirmEventType, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-delete-member',
  templateUrl: './delete-member.component.html',
  styleUrls: ['./delete-member.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class DeleteMemberComponent {
  error:string='';
  constructor(
    private memberService:MemberService, 
    private route:Router,
    private confirmationService:ConfirmationService, 
    private messageService: MessageService
  ){}
  
  destroy(id:any){
    
    this.confirmationService.confirm({
      message: 'Are you sure to delete book?',
      header: 'Delete Book',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.memberService.deleteMember(id).subscribe(
          (res)=>{
            console.log(res);
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Record Deleted Successfully.',
            });

            this.route.navigate(['/members']);
          },
          (error)=>{
            console.log(error);
            this.error = 'Error occured while deleting this member...';
          }
        )
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });

  }
}
