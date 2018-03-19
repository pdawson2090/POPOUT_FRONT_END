import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      firstn: new FormControl('',Validators.required),
      lastn: new FormControl('',Validators.required),
      favorite: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),


    });
  }


  registerUser(e) {
    //e.preventDefault();
    var url = 'http://localhost:8080/register';
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
          if (auth) {
            this.router.navigate(['login']);

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

}
