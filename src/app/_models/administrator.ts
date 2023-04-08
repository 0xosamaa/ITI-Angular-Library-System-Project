export class Administrator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: Date;
  hireDate: Date;
  image: string;

  constructor(
    _id: string,
    _firstName: string,
    _lastName: string,
    _email: string,
    _password: string,
    _birthday: Date,
    _hireDate: Date,
    _image: string
  ) {
    this.id = _id;
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.email = _email;
    this.password = _password;
    this.birthday = _birthday;
    this.hireDate = _hireDate;
    this.image = _image;
  }
}
