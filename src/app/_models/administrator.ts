export class Administrator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: string;
  hireDate: string;
  salary: number;
  image: string;

  constructor(
    _id: string,
    _firstName: string,
    _lastName: string,
    _email: string,
    _password: string,
    _birthday: string,
    _hireDate: string,
    _salary: number,
    _image: string
  ) {
    this.id = _id;
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.email = _email;
    this.password = _password;
    this.birthday = _birthday;
    this.hireDate = _hireDate;
    this.salary = _salary;
    this.image = _image;
  }
}
