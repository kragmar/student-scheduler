import { TeacherService } from './teacher.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private teacherService: TeacherService
  ) {}

  private saveToken(token: string): void {
    localStorage.setItem('auth-token', token);
    this.token = token;
  }

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

  public loggedInObservable(): Observable<any> {
    return this.loggedIn.asObservable();
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(
    method: 'post' | 'get',
    type: 'login' | 'register',
    user?: TokenPayload
  ): Observable<any> {
    let base: Observable<Object>;

    if (method === 'post') {
      base = this.http.post(`http://localhost:8080/api/${type}`, user);
    } else {
      base = this.http.get(`http://localhost:8080/api/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    const userDetails = this.getUserDetails();
    if (type === 'register') {
      const newTeacher = {
        userId: userDetails._id,
        email: userDetails.email,
        name: userDetails.name,
        phone: '',
        privileges: 'Tanár',
      };
      this.teacherService.create(newTeacher);
    }

    this.teacherService.userDetails.next(userDetails);

    this.loggedIn.next(true);

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public logout(): void {
    this.token = '';
    localStorage.removeItem('auth-token');
    this.loggedIn.next(false);
    this.router.navigateByUrl('/login');
  }
}
