import {Component, OnInit, ViewEncapsulation, Output, EventEmitter, Injectable, ElementRef} from '@angular/core';
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
  styleUrls: ['./navbar.component.css', 'profile.css','dialog.less','form.css','menu.scss','friend.css']

})

export class NavbarComponent implements OnInit {

  newEventDisplay: boolean = false;
  shouldShow: boolean = true;
  filterDisplay: boolean = false;
  loggedIn: boolean;
  eventForm : FormGroup;
  friendForm: FormGroup;
  addFriendForm: FormGroup;
  deleteFriendForm: FormGroup;
  users: User;
  event: Event;
  Filters: SelectItem[];
  filterValue: string = "";
  eventFullAddress: string;
  friends: User[];
  profileEdit: boolean = false;
  editProfileForm: FormGroup;

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private user: UserService,
    private friendService: FriendsService,
    private elementRef : ElementRef
    ) { }

  @Output() newE = new EventEmitter();
  @Output() filter: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.friendService.getFriends().subscribe(data=>{
          this.friends = data;});

    this.users = this.user.getUser();
    console.log(this.user.getUserId());
    this.loggedIn = this.userService.getUserLoggedIn();

    this.eventForm = this.fb.group({
      event_date: new FormControl('', [Validators.required, Validators.minLength(2)]),
      event_description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      event_time: new FormControl('', [Validators.required, Validators.minLength(2)]),
      event_title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      event_address: new FormControl('', [Validators.required, Validators.minLength(9)]),
      event_city: new FormControl('', [Validators.required, Validators.minLength(2)]),
      event_state: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      event_zip: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      event_type: new FormControl('', [Validators.required, Validators.minLength(2)])
    });

    this.editProfileForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.minLength(2)]),
      favorite_event: new FormControl('', [Validators.required, Validators.minLength(2)]),
      favorite_foods: new FormControl('', [Validators.required, Validators.minLength(2)]),
      hobbies: new FormControl('', [Validators.required, Validators.minLength(2)]),
      birthday: new FormControl('', [Validators.required, Validators.minLength(9)]),
    });

    this.friendForm = this.fb.group({


      friend_username: new FormControl('', Validators.required)
    });

    this.Filters = [

      {label: "Filter Type", value: null},
      {label: "Pickup Game", value: "Pickup Game"},
      {label: "Bar Crawl", value: "Bar Crawl"},
      {label: "Club", value: "Club"},
      {label: "Televised Event", value: "Televised Event"},
      {label: "Dancing", value: "Dancing"},
      {label: "Custom", value: "Custom"}

    ]
  }

  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/menu.js";
    this.elementRef.nativeElement.appendChild(s);
    s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/profile.js";
    this.elementRef.nativeElement.appendChild(s);
    s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/dialog.js";
    this.elementRef.nativeElement.appendChild(s);
    s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/form.js";
    this.elementRef.nativeElement.appendChild(s);
    s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/menu2.js";
    this.elementRef.nativeElement.appendChild(s);
    s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/friend.js";
    this.elementRef.nativeElement.appendChild(s);

  }

  // toggle(opt:number){
  //   this.option = opt;
  //   if(opt == 2){
  //     this.friendService.getFriends()
  //     .subscribe(data=>{
  //       this.friends = data;
  //
  //     });
  //   }
  // }

  addFriend(friendForm){
    this.friendService.addFriend(this.friendForm.value.friend_username)
  }

  deleteFriend(deleteFriendForm){
    this.friendService.deleteFriend(this.friendForm.value.friend_username)
  }


  newEvent(e){
    console.log(this.eventForm.value.event_address);
    this.makeFullAddress();
    this.event = new Event(0,this.eventForm.value.event_title,this.eventForm.value.event_description,this.eventForm.value.event_type,this.users.id,this.eventFullAddress,this.eventForm.value.event_date.toDateString(),this.eventForm.value.event_time.toTimeString(),0,0);
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
    this.router.navigate(['']);

  }

  makeFullAddress(): void {

    this.eventFullAddress = this.eventForm.value.event_address + ', ' + this.eventForm.value.event_city + ', ' + this.eventForm.value.event_state + ' ' + this.eventForm.value.event_zip;


  }

  editProfile(): void {

    this.users.email = this.editProfileForm.value.email;
    this.users.birthday = this.editProfileForm.value.birthday;
    this.users.favorite = this.editProfileForm.value.favorite_event;
    this.users.favorite_food = this.editProfileForm.value.favorite_foods;
    this.users.hobbies = this.editProfileForm.value.hobbies;
    this.userService.editProfile(this.users);
    this.profileEdit = false;

  }

}
