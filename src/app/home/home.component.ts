import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','home.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private elementRef : ElementRef) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/home.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  registerScreen(){
    this.router.navigate(['register'])
}

}
