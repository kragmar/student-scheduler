import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDetails } from './auth.service';

export interface Teacher {
  _id?: string;
  userId: string;
  email: string;
  name: string;
  phone: string;
  privileges: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private readonly apiUrl = 'http://localhost:8080/api/teachers/';
  userDetails = new BehaviorSubject<UserDetails>(<UserDetails>{});
  currentUserId: string;

  constructor(private http: HttpClient) {
    this.userDetails.subscribe((data) => {
      this.currentUserId = data._id;
    });
  }

  get currentUser(): string {
    return this.currentUser;
  }

  public create(user: Teacher): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  public findAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public findOne(user: Teacher): Observable<any> {
    const id = user._id;

    return this.http.get(this.apiUrl + id);
  }

  public update(user: Teacher): Observable<any> {
    const id = user._id;

    return this.http.put(this.apiUrl + id, user);
  }

  public delete(user: Teacher): Observable<any> {
    const id = user._id;

    return this.http.delete(this.apiUrl + id);
  }
}
