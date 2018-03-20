import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { Event } from '../domain/event';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

  events: Event[] = [];

  display: boolean = false;

  //This method will return a given event by event ID
  getEvent(id: number): Observable<Event> {

    return this.http.get<Event>(`http://localhost:8080/event/?id=${id}`);

  }

  //This method will return all events currently in the database
  getEvents(): Observable<Event[]> {

    return this.http.get<Event[]>(`http://localhost:8080/allEvents`);

  }

  //This method will submit a new event
  newEvent(event: Event): void {

    var url = 'http://localhost:8080/newEvent';
    const req =  this.http.post(url, {
        event_title: event.event_title,
        event_description: event.event_description,
        event_type: event.event_type,
        event_address:  event.event_address,
        event_date:  event.event_date,
        event_time:  event.event_time,
        lat:  event.lat,
        lng:  event.long
      }
    ).subscribe()

  }

  //Used for local debugging of adding event code.  Gets all the events stored in the array of events.
  getLocalEvents(): Event[] {

    return this.events;

  }

  //Used for local debugging of adding event code.  Actually adds the event to the local array of events.
  addLocalEvent(event: Event): void {

    this.events.push(event);

  }

}
