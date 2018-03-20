import {Component, OnInit} from '@angular/core';
import {MapsAPILoader, MouseEvent} from '@agm/core';
import {Event} from '../domain/event';
import {EventService} from '../services/event.service';


interface marker {
  lat: number;
  lng: number;
  title: string;
  address: string;
  description: string;
  draggable: boolean;
}
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  draggable: boolean;
  markers: marker[] = [];
  zoom: number = 8;
  geocoder: any;
  display: boolean = false;

  events: Event[] = [];
  isSnazzyInfoWindowOpened: boolean = false;

  constructor(private maps: MapsAPILoader, private eventService: EventService) {
  }

  ngOnInit() {

    this.eventService.getEvents().subscribe(data => {
      this.events = data;
      this.maps.load().then(() => {
        this.geocoder = new google.maps.Geocoder();
        this.geocodeEvents();
        console.log(this.events);
        console.log(this.events[0].event_title);
      });
    });
  }

  showDialog() {
    this.display = true;
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      title: null,
      description: null,
      address: null,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  geocodeEvents(): void {
    for (let i = 0; i < this.events.length; i++) {
      this.geocoder.geocode({'address': this.events[i].event_address}, (results, status) => {
        this.markers.push({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          title: this.events[i].event_title,
          address: this.events[i].event_address,
          description: this.events[i].event_description,
          draggable: true
        });
      });
    }

  }

}
