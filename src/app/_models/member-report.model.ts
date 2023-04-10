export interface MembersReport {
  _id?: string;
  year: number;
  month: string;
  numberOfMembers?: number;
  newMembers?: number;
  deletedMembers?: number;
}
