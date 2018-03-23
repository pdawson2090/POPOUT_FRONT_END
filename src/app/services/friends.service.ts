import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../domain/user';

@Injectable()
export class FriendsService {

  constructor(private http:HttpClient, private user: UserService) { }

  //gets a friends list with the logged in users id
  getFriends() {
    var id:number = this.user.getUserId();
    //console.log(id);
    
    return this.http.get<User[]>(`https://popout-back.herokuapp.com/getFriends?id=${id}`);
  }

  friend: User;
  getFriendId(username:string):Observable<User>{
    console.log(username);
    
    return this.http.get<User>(`https://popout-back.herokuapp.com/name?username=${username}`);
  }

  addFriend(username:string){
    var uid: number = this.user.getUserId();
    this.getFriendId(username).subscribe(data=>{
      this.friend = data;
    });
    
  }

}
