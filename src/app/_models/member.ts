export class Member {
    constructor(
        public fullName:string,
        public email:string,
        public password:string,
        public birthDate:Date,
        public phoneNumber?:string,
        public image?:string,
        public created_at?:Date,
        public address?:string,   // this variable may be redeclared to be of type object...
        public settings:string = "default",
        public isBanned:boolean = false,
        public id?:string,
    ){}
}
