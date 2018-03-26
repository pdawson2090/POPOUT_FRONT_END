import {Injectable} from '@angular/core';
import {User} from '../domain/user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private username;
  private page;
  private isUserManager;
  private id;

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
    this.id = 0;
    this.users = new User(0,"0","0","0","0","0")
  }

  private users: User;

  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  setUserLoggedOut() {
    this.isUserLoggedIn = false;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  setManager(x) {
    this.isUserManager = x;
  }

  setUser(x:User) {
    this.users = x;
    this.id = x.id;
  }

  getUserId() {
    return this.id;
  }

  getUser() {
    return this.users;
  }

  getUserManager() {
    return this.isUserManager;
  }

  editProfile(user: User): void {

    this.http.post('localhost:8080/update-user', user);

  }


}
