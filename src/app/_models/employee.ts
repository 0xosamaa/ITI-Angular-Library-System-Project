export class Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | undefined;
  birthDate: string;
  settings: string;
  hireDate: string;
  image: string;
  salary: number;

  constructor(_id: string, firstName: string, lastName: string, email: string, password: string | undefined, birthDate: string, settings: string, hireDate: string, image: string, salary: number) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.birthDate = birthDate;
    this.settings = settings;
    this.hireDate = hireDate;
    this.image = image;
    this.salary = salary;
  }
}
