import {Component, ElementRef, OnInit} from '@angular/core';
import {MapsAPILoader, MouseEvent} from '@agm/core';
import {Event} from '../domain/event';
import {EventService} from '../services/event.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {User} from '../domain/user';


interface marker {
  lat: number;
  lng: number;
  id : number;
  title: string;
  address: string;
  description: string;
  type: string;
  date: string;
  time: string;
  draggable: boolean;
  visible: boolean;
}
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css','map.scss']
})
export class MapComponent implements OnInit {

  mapStyle: any[];
  temp: any[];
  markers: marker[] = [];
  zoom: number = 8;
  geocoder: any;
  newEventDisplay: boolean = false;
  filterDisplay: boolean = false;
  OPdisplay: boolean = false;
  events: Event[] = [];
  isSnazzyInfoWindowOpened: boolean = false;
  users : User;

  constructor(
    private maps: MapsAPILoader,
    private eventService: EventService,
    private http : HttpClient,
    private user : UserService,
    private elementRef: ElementRef
    ) {}

  ngOnInit() {
    this.users = this.user.getUser();
    this.mapStyle =[
      {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
          {
            "invert_lightness": true
          },
          {
            "saturation": 10
          },
          {
            "lightness": 30
          },
          {
            "gamma": 0.5
          },
          {
            "hue": "#435158"
          }
        ]
      }
    ]




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

  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/map.js";
    this.elementRef.nativeElement.appendChild(s);
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     title: null,
  //     date: null,
  //     description: null,
  //     time: null,
  //     address: null,
  //     draggable: true
  //   });
  // }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  geocodeEvents(): void {
    this.markers = [];

    for (let i = 0; i < this.events.length; i++) {

      this.geocoder.geocode({'address': this.events[i].event_address}, (results, status) => {
        this.temp = ((this.events[i].event_address).split(","));
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        this.addMarker(lat, lng, i)
      });
    }

  }

  addMarker(lat: any, lng: any, i: number): void {

    this.markers.push({
      lat: lat,
      lng: lng,
      title: this.events[i].event_title,
      id: this.events[i].id,
      address: this.temp[0],
      date: this.events[i].event_date,
      time: this.events[i].event_time,
      description: this.events[i].event_description,
      type: this.events[i].event_type,
      draggable: false,
      visible: true

    });

  }

  applyFilter(filter: string): void {

    console.log(filter);

    for(let i = 0; i < this.markers.length; i++){

      if(filter == null){

        this.markers[i].visible = true;

      }else{

        if(this.markers[i].type === filter){

          this.markers[i].visible = true;

        }else{

          this.markers[i].visible = false;

        }

      }

    }

  }

  refreshMap(): void {

    this.eventService.getEvents().subscribe(data => {

      console.log('i was called')

      this.events = data;
      console.log(this.events);
      this.geocodeEvents();

    });

  }

  attendEvent(mid:number): void{
    this.http.get<Event[]>(`https://popout-back.herokuapp.com/attendEvent?user_id=${this.user.getUserId()}&event_id=${mid}`).subscribe();

  }
}
