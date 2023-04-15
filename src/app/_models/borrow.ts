export interface Borrow {
  _id?: string;
  bookID: string;
  memberID: string;
  employeeID: string;
  borrowDate: Date;
  returnDate: Date;
  deadlineDate: Date;
}
