import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserDetails } from './auth.service';
import { map, publishReplay, refCount } from 'rxjs/operators';

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
  currentTeacherId: string;

  cachedTeachers = new Map();

  token: string;

  constructor(private http: HttpClient) {}

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('auth-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;

    if (token) {
      payload = token.split('.')[1];
      payload = atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  get currentUser(): string {
    const userDetails = this.getUserDetails();
    this.currentTeacherId = this.cachedTeachers
      .get(this.apiUrl)
      .find((teacher) => teacher.userId === userDetails._id)._id;
    return this.currentTeacherId;
  }

  public create(user: Teacher): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  public findAll(): Observable<any> {
    const teachersFromCache = this.cachedTeachers.get(this.apiUrl);
    if (teachersFromCache) {
      return of(teachersFromCache);
    }

    const response = this.http.get<any>(this.apiUrl);
    response.subscribe((teachers) => {
      this.cachedTeachers.set(this.apiUrl, teachers);
    });

    return response;
  }

  public findAllB(): Observable<any> {
    const response = this.http.get<any>(this.apiUrl);
    response.subscribe((teachers) => {
      this.cachedTeachers.set(this.apiUrl, teachers);
    });

    return response;
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
