import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None,
  //styleUrls: ['./navbar.component.css']
  
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
