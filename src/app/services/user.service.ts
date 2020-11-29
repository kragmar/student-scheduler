import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDetails } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userDetails = new BehaviorSubject<UserDetails>(null);

  constructor() {}

  get loggedInUser() {
    return this.userDetails.asObservable();
  }
}
