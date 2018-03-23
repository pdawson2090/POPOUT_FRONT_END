import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {User} from '../domain/user';


@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [MessageService, FormBuilder]
})
export class LoginFormComponent implements OnInit {
  username: string;
  password: string;
  return: string = '';
  msgs: Message[];
  users: User;
  constructor(private fb: FormBuilder, private router: Router, private user: UserService, private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
  }

  loginUser(e) {
    e.preventDefault();


    var url = 'https://popout-back.herokuapp.com/login';
    const req = this.http.post(url, {
      username: e.target.elements[0].value,
      password: e.target.elements[1].value

    })
      .subscribe(
        res => {
          this.msgs = [];

          var auth = JSON.parse(JSON.stringify(res));

          if (auth != null) {
            this.users = new User(auth.id, auth.email, auth.favorite_type, auth.first_name, auth.last_name,auth.username);
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

    // let options = new Options({ headers: headers });
    // Observable <HttpResponse> ob = (this.http.post(url, complexdata));


  }
}
