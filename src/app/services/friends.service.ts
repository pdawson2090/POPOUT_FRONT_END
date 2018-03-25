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
    console.log(id);
    
    return this.http.get<User[]>(`https://popout-back.herokuapp.com/getFriends?id=${id}`);
  }

  friend: User;
  getFriendId(username:string):Observable<User>{
    console.log(username);
    
    return this.http.get<User>(`https://popout-back.herokuapp.com/name?username=${username}`);
  }

  f:User;
  addFriend(username:string){
    console.log('adding friend');
    var uid: number = this.user.getUserId();
    console.log('got userid = '+uid);
    this.getFriendId(username).subscribe(data=>{
      let fid = data.id;
      console.log('got friend with uid = ' + fid);
      
      this.http.get(`https://popout-back.herokuapp.com/newFriend?friendA=${uid}&friendB=${fid}`).subscribe(data => {
        console.log(data);
        console.log('added friend');
        
        
      });
      
    });
    
  }

}
