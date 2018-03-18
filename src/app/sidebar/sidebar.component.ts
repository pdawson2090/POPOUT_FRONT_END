import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../domain/event';
import { EventService } from '../services/event.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Http, Headers, RequestOptions} from '@angular/http';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private eventService: EventService, private fb: FormBuilder,private http: HttpClient) { }

  @Input() display;
  eventForm:FormGroup;
  event: Event;

  ngOnInit() {
    this.eventForm = this.fb.group({
      event_date: new FormControl('',Validators.required),
      event_description: new FormControl('',Validators.required),
      event_time: new FormControl('',Validators.required),
      event_title: new FormControl('',Validators.required),
      event_address: new FormControl('',Validators.required),


    });
    // this.event = new Event(0,"","","","","",0,0);

  }

  newEvent(e){
    console.log(this.eventForm.value.event_address);
    console.log("WoW");
    this.event = new Event(0,this.eventForm.value.event_title,this.eventForm.value.event_description,this.eventForm.value.event_date,this.eventForm.value.event_time,this.eventForm.value.event_address,0,0);

  //Im tired this is redundant but it works.

    var url = 'https://popout-back.herokuapp.com/newEvent';
    const req = this.http.post(url, {
      event_title: this.event.event_title,
      event_description: this.event.event_description,
      event_date: this.event.event_date,
      event_time: this.event.event_time,
      event_address: this.event.event_address,
      lat: this.event.lat,
      long: this.event.long
    }
  ).subscribe(res => { console.log("Submitted")});

  }

  toggleSidebar(): void {

    this.display = false;
    this.event = new Event(0,"","","","","",0,0);

  }

}
