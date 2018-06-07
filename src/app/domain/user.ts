export class User {

  public id: number;
  public email: string;
  public favorite: string;
  public first_name: string;
  public last_name: string;
  public username: string;

  constructor(
    id: number,
    email: string,
    favorite: string,
    first_name: string,
    last_name: string,
    username: string,

  ) {
    this.id = id;
    this.email = email;
    this.favorite = favorite;
    this.first_name = first_name;
    this.last_name = last_name;
    this.username = username;

  }

}
