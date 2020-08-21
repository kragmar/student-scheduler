import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { newUser } from '../models/new-user';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:8080/api/users/';

  constructor(private http: HttpClient) {}

  public getAllUsers() {
    return this.http.get(this.apiUrl);
  }

  public postUser(newUser: newUser) {
    return this.http.post(this.apiUrl, newUser, httpOptions);
  }

  public updateUser(user: User) {
    var id = user._id;
    let url = this.apiUrl + id;

    return this.http.put(url, user, httpOptions);
  }

  public deleteUser(user: User) {
    let id = user._id;
    let url = this.apiUrl + id;

    return this.http.delete(url, httpOptions);
  }
}
