import { Injectable } from '@angular/core';
import {CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private userService: UserService, private auth: AuthService) { }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$
      .pipe(switchMap(user => this.userService.get(user.uid).valueChanges()))
      .pipe(map( appUser => appUser.isAdmin));
  }
}
