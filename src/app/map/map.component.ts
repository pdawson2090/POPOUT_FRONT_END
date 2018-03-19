import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Event } from '../domain/event';
import { EventService } from '../services/event.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  geocoder: any;
  //event: Event;
  events: Event[] = [];

  constructor(private maps: MapsAPILoader, private eventService: EventService) { }

  ngOnInit() {

    // this.event = new Event(1,"Revature Party","Party at Revature HQ, Java Batches Only!!!","11730 Plaza America Dr, Reston, VA 20190","4/15/18","5:30",0,0);
    // this.eventService.addLocalEvent(this.event);
    //this.event = new Event(0,"","","","","",0,0);

    this.eventService.getEvents().subscribe(data => {

      this.events = data;
      console.log(this.events);

      this.maps.load().then(() => {

        this.geocoder = new google.maps.Geocoder();
        this.geocodeEvents();
        console.log(this.events);
  
        // this.geocoder.geocode({'address' : this.address}, (results, status) => {
        //   this.lat = results[0].geometry.location.lat();
        //   this.lng = results[0].geometry.location.lng();
        //   this.event = new Event(1,"Test Title","This is just a test so that I can get it in the descriptor","11730 Plaza America Dr, Reston, VA 20190","4/15/18","7:30",this.lat,this.lng);
        //   this.addEvent(this.event);
        //   this.event = new Event(2,"Other Test Title","This is the second Test","","7/22/18","6:45",31,-60);
        //   this.addEvent(this.event);
  
      });

    })

    

  }

  geocodeEvents(): void {

    for(let i = 0; i < this.events.length; i++){

      //if(this.events[i].lat === 0 && this.events[i].long === 0){

        this.geocoder.geocode({'address' : this.events[i].event_address }, (results, status) =>{

          this.events[i].lat = results[0].geometry.location.lat();
          this.events[i].long = results[0].geometry.location.lng();

        });

      //}

    }

  }

}
