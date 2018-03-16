import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./navbar.component.css']
  
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
