import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Event} from '../domain/event';
import {EventService} from '../services/event.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {User} from '../domain/user';
import {SelectItem} from 'primeng/api';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./navbar.component.css']

})

export class NavbarComponent implements OnInit {

  newEventDisplay: boolean = false;
  filterDisplay: boolean = false;
  OPdisplay: boolean = false;
  loggedIn: boolean;
  eventForm : FormGroup;
  friendForm: FormGroup;
  users: User;
  event: Event;
  eventTypes: SelectItem[];
  selectedEventType: string = "";
  filterValue: string = "";
  eventFullAddress: string;
  friends: User[];

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private user: UserService,
    private friend: FriendsService
    ) { }

  @Output() newE = new EventEmitter();
  @Output() filter: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {

    this.users = this.user.getUser();
    console.log(this.user.getUserId());
    this.loggedIn = this.userService.getUserLoggedIn();

    this.eventForm = this.fb.group({
      event_date: new FormControl('',Validators.required),
      event_description: new FormControl('',Validators.required),
      event_time: new FormControl('',Validators.required),
      event_title: new FormControl('',Validators.required),
      event_address: new FormControl('',Validators.required),
      event_city: new FormControl('', Validators.required),
      event_state: new FormControl('', Validators.required),
      event_zip: new FormControl('', Validators.required),
      event_type: new FormControl('', Validators.required),
    });

    this.friendForm = this.fb.group({
      friend_username: new FormControl('', Validators.required)
    });

    this.eventTypes = [

      {label: "Select Event Type", value: null},
      {label: "Pickup Game", value: "Pickup Game"},
      {label: "Bar Crawl", value: "Bar Crawl"},
      {label: "Birthday Party", value: "Birthday Party"},
      {label: "Club", value: "Club"},
      {label: "Brunch", value: "Brunch"},
      {label: "Televised Event", value: "Televised Event"},
      {label: "Dancing", value: "Dancing"},
      {label: "Custom", value: "Custom"}

    ]
  }

private option:number;
  toggle(opt:number){
    this.option = opt;
    if(opt == 3){
      this.friend.getFriends();
      //.subscribe(data=>{
      //   this.friends = data;
      // });
    }
    if(opt == 2){
      this.friend.getFriends();
    }
  }

  addFriend(friendForm){
    this.friend.addFriend(this.friendForm.value.friend_username)
  }


  newEvent(e){
    console.log(this.eventForm.value.event_address);
    this.makeFullAddress();
    this.event = new Event(0,this.eventForm.value.event_title,this.eventForm.value.event_description,this.eventForm.value.event_type,this.users.id,this.eventFullAddress,this.eventForm.value.event_date,this.eventForm.value.event_time,0,0);
    this.eventService.newEvent(this.event);
    this.event = new Event(0,"","","",this.users.id,"","","",0,0);
    this.newE.emit();
    this.newEventDisplay = false;

  }

  toggleSidebar(): void {

    if(!this.newEventDisplay){
      this.newEventDisplay = true;
    }
    else{
      this.newEventDisplay = false;
    }

  }

  applyFilter(): void {

    this.filter.emit(this.filterValue);
    this.filterDisplay = false;

  }

  logOut(): void {

    this.userService.setUserLoggedOut();
    this.router.navigate(['login']);

  }

  makeFullAddress(): void {

    this.eventFullAddress = this.eventForm.value.event_address + ', ' + this.eventForm.value.event_city + ', ' + this.eventForm.value.event_state + ' ' + this.eventForm.value.event_zip;
    

  }

}
