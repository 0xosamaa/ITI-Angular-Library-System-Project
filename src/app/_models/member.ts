export interface Address{
    city?:string,
    street?:string,
    building?:string
}
export class Member {
    constructor(
        public _id?:string,
        public fullName?:string,
        public email?:string,
        public password?:string,        
        public createdAt?:Date,
        public birthDate?:Date,
        public fullAddress?:Address,  // ={city:"",street:"",building:""} this variable may be redeclared to be of type object...   
        public phoneNumber?:string,
        public image?:string,

        public settings:string = "default",
        public isBanned:boolean = false,
        public firstLogin:boolean=true,
    ){}
}
