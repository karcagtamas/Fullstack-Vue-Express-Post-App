export default class Post {
  // tslint:disable-next-line: variable-name
  public _id: string;
  public text: string;
  public createdAt: Date;

  constructor(id: string, text: string, createdAt: Date) {
    this._id = id;
    this.text = text;
    this.createdAt = createdAt;
  }
}
