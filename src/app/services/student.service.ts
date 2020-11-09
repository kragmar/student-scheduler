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
  phone: string;
  birthDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly apiUrl = 'http://localhost:8080/api/students/';

  constructor(private http: HttpClient) {}

  public create(student: StudentPayload): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }

  public findAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public findOne(student: StudentPayload): Observable<any> {
    const id = student._id;

    return this.http.get(this.apiUrl + id);
  }

  public update(student: StudentPayload): Observable<any> {
    const id = student._id;

    return this.http.put(this.apiUrl + id, student);
  }

  public delete(student: StudentPayload): Observable<any> {
    const id = student._id;

    return this.http.delete(this.apiUrl + id);
  }
}
