import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { FriendsService } from './friends.service';

export class Message{
  content:string;
  style:string;
  dismissed:boolean;

  constructor(content, style?){
    this.content = content;
    this.style = style || 'info'

  }
}

@Injectable()
export class ToastMessagesService {

  constructor(private http:HttpClient, private userService:UserService, private friendService:FriendsService) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`https://popout-back.herokuapp.com/messages?id=${this.userService.getUserId()}`);
  }

  sendMessage(content:string, style:string, recipient:string){
    let msg = new Message(content, style);
    this.http.post(`https://popout-back.herokuapp.com/sendMessage?sendId=${this.userService.getUserId}&recId=${this.friendService.getFriendId(recipient)}`, JSON.stringify(msg));
  }

}