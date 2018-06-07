import {Injectable} from '@angular/core';
import {User} from './domain/user';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private username;
  private page;
  private isUserManager;

  constructor() {
    this.isUserLoggedIn = false;
  }

  users : User[];
  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  setUserLoggedOut() {
    this.isUserLoggedIn = false;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }
  setUsername(y){
    this.username = y;
  }
  getUsername(){
    return this.username;
}

setManager(x){
    this.isUserManager = x;
}
getUserManager(){
    return this.isUserManager;
}


}
