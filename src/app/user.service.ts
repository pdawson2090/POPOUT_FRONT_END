import {Injectable} from '@angular/core';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private username;
  private page;
  private isUserManager;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  setUserLoggedOut() {
    this.isUserLoggedIn = false;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  setUserCurrentPage(x) {
    this.page = x;
  }
  getUserCurrentPage(){
    return this.page;
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
