import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../domain/user';
import {Message} from 'primeng/api';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','./register.scss','button.scss', '../home/home.scss','buttonstyle.css','button.styl']
})
export class RegisterComponent implements OnInit {
  msgs: Message[];
  users: User;
  username: any;
  password:any;
  email: any;
  favorite: any;
  first: any;
  last: any;

  userForm: FormGroup;

  constructor(private elementRef: ElementRef, private fb: FormBuilder, private user: UserService, private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      firstn: new FormControl('', Validators.required),
      lastn: new FormControl('', Validators.required),
      favorite: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),


    });
  }

  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/register.js";
    this.elementRef.nativeElement.appendChild(s);
    s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../../assets/button.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  registerUser() {
    //e.preventDefault();
    var url = 'https://popout-back.herokuapp.com/register';
    const req = this.http.post(url, {
      username: this.userForm.value.username,
      password: this.userForm.value.password,
      first_name: this.userForm.value.firstn,
      last_name: this.userForm.value.lastn,
      favorite_type: this.userForm.value.favorite,
      email: this.userForm.value.email,



    })
      .subscribe(
        res => {

          var auth = JSON.parse(JSON.stringify(res));
          if (auth.booleanValue) {
            this.router.navigate(['register']);

          } else {
            this.router.navigate(['']);

          }

        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occured.');
          } else {
            console.log('Server-side error occured.');
          }
        }
      );

  }


  loginUser(e) {


    var url = 'https://popout-back.herokuapp.com/login';
    const req = this.http.post(url, {
      username: this.userForm.value.username,
      password: this.userForm.value.password,

    })
      .subscribe(
        res => {
          this.msgs = [];

          var auth = JSON.parse(JSON.stringify(res));

          if (auth != null) {
            this.users = new User(auth.id, auth.email, auth.favorite_type, auth.first_name, auth.last_name, auth.username);
            this.user.setUser(this.users);
            this.user.setUserLoggedIn();
            this.user.setManager(auth.Manager);
            this.router.navigate(['map']);

          } else {

            // this.msgs.push({severity: 'ui-messages-error', summary: 'INVLAID', detail: 'Verification Failed'});
          }

        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occured.');
          } else {
            console.log('Server-side error occured.');
          }
        }
      );
  }
}
