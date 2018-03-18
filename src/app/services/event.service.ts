import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { Event } from '../domain/event';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

  display: boolean = false;

  //This method will return a given event by event ID
  getEvent(id: number): Observable<Event> {

    return this.http.get<Event>(`http://localhost:8080/event/?id=${id}`);

  }

  //This method will return all events currently in the database
  getEvents(): Observable<Event[]> {

    return this.http.get<Event[]>(`http://localhost:8080/event/events`);

  }

  //This method will submit a new event
  newEvent(event: Event): void {

    this.http.post('http://localhost:8080/newEvent', event);

  }

}
