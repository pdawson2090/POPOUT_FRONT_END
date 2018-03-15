import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Event } from '../domain/event';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  geocoder: any;
  address: string;
  lat: number = 0;
  lng: number = 0;
  event: Event;

  constructor(private maps: MapsAPILoader) { }

  ngOnInit() {

    this.maps.load().then(() => {

      this.geocoder = new google.maps.Geocoder();
      this.address = "11730 Plaza America Dr, Reston, VA 20190";
      this.geocoder.geocode({'address' : this.address}, (results, status) => {
        this.lat = results[0].geometry.location.lat();
        this.lng = results[0].geometry.location.lng();
        this.event = new Event(1,"Test Title","This is just a test so that I can get it in the descriptor","4/15/18","7:30",this.lat,this.lng);
      });

    });

  }

}
