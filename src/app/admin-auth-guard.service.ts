import { Injectable } from '@angular/core';
import {CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import {UserService} from './user.service';
import * as firebase from 'firebase';
import {AppUser} from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  fbUser: firebase.User;
  constructor(private userService: UserService, private auth: AuthService) { }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    this.fbUser = firebase.auth().currentUser;

    return this.userService.get(this.fbUser.uid).valueChanges()
      .pipe(map((appUser: AppUser) => appUser.isAdmin));
      // return this.auth.appUser$
      // .pipe(map( appUser => appUser.isAdmin));
  }
}
