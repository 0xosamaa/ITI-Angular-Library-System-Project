export class Book {
  constructor(
    public id: string = "",
    public title: string = "",
    public author: string = "",
    public publisher: string = "",
    public dateAdded?: Date,
    public datePublished?: Date,
    public category: string = "",
    public pagesCount: number = 1,
    public copiesCount: number = 1,
    public isAvailable: boolean = false,
    public shelfNo: number = 1
  ) {}
}
