import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  memberDetails: EventEmitter<Member> = new EventEmitter<Member>();
  member:Member = new Member();

  constructor(private http:HttpClient, @Inject("baseURL") public baseURL:string) { }

  getAllMembers(){
    return this.http.get(this.baseURL+"/members")
  }

  getMember(id:string){
    return this.http.get(this.baseURL+`/members/${id}`).subscribe(
      (res:any)=>{
        this.member = res.data
        this.memberDetails.emit(this.member);
        console.log(res);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  addMember(member:FormData){
    return this.http.post(this.baseURL+"/members", member);
  }

  deleteMember(id:string){
    return this.http.delete(this.baseURL+`/members/${id}`)
  }

  updateMember(member:FormData){
    return this.http.put(this.baseURL+"/members", member).subscribe(
      (res)=>{
        console.log(res);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  
}
