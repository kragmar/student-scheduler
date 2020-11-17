import { Observable } from 'rxjs';
import { UserDetails } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';
import { Student } from './student.service';

export interface Lesson {
  _id?: string;
  date: Date;
  type: string;
  recurring: boolean;
  studentId: string;
  teacherId: string;
}

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private readonly apiUrl = 'http://localhost:8080/api/lessons/';

  constructor(private http: HttpClient) {}

  public create(lesson: Lesson): Observable<any> {
    return this.http.post(this.apiUrl, lesson);
  }

  public findAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public findOne(lesson: Lesson): Observable<any> {
    const id = lesson._id;

    return this.http.get(this.apiUrl + id);
  }

  public findAllAfterToday(date: any): Observable<any> {
    return this.http.get(this.apiUrl + 'date/' + date);
  }

  public update(lesson: Lesson): Observable<any> {
    const id = lesson._id;

    return this.http.put(this.apiUrl + id, lesson);
  }

  public delete(lesson: Lesson): Observable<any> {
    const id = lesson._id;

    return this.http.delete(this.apiUrl + id);
  }
}
