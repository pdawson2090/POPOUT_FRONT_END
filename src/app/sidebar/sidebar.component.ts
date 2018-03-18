import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../domain/event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private eventService: EventService) { }

  @Input() display;

  event: Event;

  ngOnInit() {

    this.event = new Event(0,"","","","","",0,0);

  }

  newEvent(): void {

    //Uncomment this line when the backend is ready
    //this.eventService.newEvent(this.event);
    
    //Comment or Delete this when the backend is ready.  It only adds events on the client side.
    this.eventService.addLocalEvent(this.event);

    this.event = new Event(0,"","","","","",0,0);
    this.display = false;

  }

  toggleSidebar(): void {

    this.display = false;
    this.event = new Event(0,"","","","","",0,0);

  }

}
