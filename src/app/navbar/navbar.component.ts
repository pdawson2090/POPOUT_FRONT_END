import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Event} from '../domain/event';
import {EventService} from '../services/event.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./navbar.component.css']

})
export class NavbarComponent implements OnInit {

  display: boolean = false;
  OPdisplay: boolean = false;
  loggedIn: boolean;
  eventForm : FormGroup;
  event: Event;
  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {

    this.loggedIn = this.userService.getUserLoggedIn();

    this.eventForm = this.fb.group({
      event_date: new FormControl('',Validators.required),
      event_description: new FormControl('',Validators.required),
      event_time: new FormControl('',Validators.required),
      event_title: new FormControl('',Validators.required),
      event_address: new FormControl('',Validators.required),
      event_type: new FormControl('', Validators.required),
      event_host: new FormControl('', Validators.required)
    });
  }

  newEvent(e){
    console.log(this.eventForm.value.event_address);
    this.event = new Event(0,this.eventForm.value.event_title,this.eventForm.value.event_description,this.eventForm.value.event_type,this.eventForm.value.event_host,this.eventForm.value.event_address,this.eventForm.value.event_date,this.eventForm.value.event_time,0,0);
    this.eventService.newEvent(this.event);
    this.eventService.getLocalEvents();
    this.display = false;
    this.router.navigate(['map']);

  }

  toggleSidebar(): void {

    if(!this.display){
      this.display = true;
    }
    else{
      this.display = false;
    }

  }

  logOut(): void {

    this.userService.setUserLoggedOut();
    this.router.navigate(['login']);

  }

}
