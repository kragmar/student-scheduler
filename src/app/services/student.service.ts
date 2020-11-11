import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
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

  public create(student: Student): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }

  public findAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public findOne(student: Student): Observable<any> {
    const id = student._id;

    return this.http.get(this.apiUrl + id);
  }

  public update(student: Student): Observable<any> {
    const id = student._id;

    return this.http.put(this.apiUrl + id, student);
  }

  public delete(student: Student): Observable<any> {
    const id = student._id;

    return this.http.delete(this.apiUrl + id);
  }
}
