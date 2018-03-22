import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Event} from '../domain/event';
import {EventService} from '../services/event.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {User} from '../domain/user';
import {SelectItem} from 'primeng/api';

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
  users: User;
  event: Event;
  eventTypes: SelectItem[];
  selectedEventType: string = "";

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private user: UserService,
    ) { }

  @Output() newE = new EventEmitter();

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
      event_type: new FormControl('', Validators.required),
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

  newEvent(e){
    console.log(this.eventForm.value.event_address);
    this.event = new Event(0,this.eventForm.value.event_title,this.eventForm.value.event_description,this.eventForm.value.event_type,this.eventForm.value.event_host,this.eventForm.value.event_address,this.eventForm.value.event_date,this.eventForm.value.event_time,0,0);
    this.eventService.newEvent(this.event);
    this.event = new Event(0,"","","",this.users.id,"","","",0,0);
    this.newEventDisplay = false;
    this.newE.emit();
    //this.router.navigate(['map']);

  }

  toggleSidebar(): void {

    if(!this.newEventDisplay){
      this.newEventDisplay = true;
    }
    else{
      this.newEventDisplay = false;
    }

  }

  logOut(): void {

    this.userService.setUserLoggedOut();
    this.router.navigate(['login']);

  }

}
