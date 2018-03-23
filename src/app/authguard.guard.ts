import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from './user.service';


@Injectable()
export class AuthguardGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.user.getUserLoggedIn()) {
      return true;
        } else {
          this.router.navigate([''], {
            queryParams: {
              return: state.url
            }
          });
          return false;
        }
      }

}
