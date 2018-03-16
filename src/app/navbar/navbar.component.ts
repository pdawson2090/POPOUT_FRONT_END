import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./navbar.component.css']
  
})
export class NavbarComponent implements OnInit {

  display: boolean = false;

  loggedIn: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSidebar(): void {

    if(!this.display){
      this.display = true;
    }
    else{
      this.display = false;
    }

  }

}
