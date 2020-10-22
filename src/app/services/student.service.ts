import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewStudent } from '../models/new-student';
import { Student } from './../models/student';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface StudentPayload {
  _id?: string;
  name: string;
  email: string;
  telNum: string;
  birthDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly apiUrl = 'http://localhost:8080/api/students/';

  constructor(private http: HttpClient) {}

  private request(
    method: 'post' | 'get' | 'getId' | 'put' | 'delete',
    student?: StudentPayload
  ): Observable<any> {
    let base: Observable<Object>;

    switch (method) {
      case 'post':
        base = this.http.post(this.apiUrl, student);
        break;

      case 'get':
        base = this.http.get(this.apiUrl);
        break;

      case 'put':
        base = this.http.put(this.apiUrl + student._id, student);
        break;

      case 'delete':
        base = this.http.delete(this.apiUrl + student._id);
        break;

      default:
        break;
    }

    const request = base.pipe(
      map((data: StudentPayload) => {
        console.log(data);
        return data;
      })
    );

    return request;
  }

  public create(student: StudentPayload): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }
}
