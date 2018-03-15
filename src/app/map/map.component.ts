import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  geocoder: any;
  address: string;
  lat: number;
  lng: number;

  constructor(private maps: MapsAPILoader) { }

  ngOnInit() {

    this.maps.load().then(() => {

      this.geocoder = new google.maps.Geocoder();
      this.address = "11730 Plaza America Dr, Reston, VA 20190";
      this.geocoder.geocode({'address' : this.address}, (results, status) => {
        this.lat = results[0].geometry.location.lat();
        this.lng = results[0].geometry.location.lng();
      });

    });

  }

}
