import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NewLesson } from './../models/new-lesson';
import { Lesson } from './../models/lesson';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private readonly apiUrl = 'http://localhost:8080/api/lessons/';

  constructor(private http: HttpClient) {}

  public getAllLessons() {
    return this.http.get(this.apiUrl);
  }

  public postLesson(newLesson: NewLesson) {
    return this.http.post(this.apiUrl, newLesson, httpOptions);
  }

  public updateLesson(lesson: Lesson) {
    var id = lesson._id;
    let url = this.apiUrl + id;

    return this.http.put(url, lesson, httpOptions);
  }

  public deleteLesson(lesson: Lesson) {
    let id = lesson._id;
    let url = this.apiUrl + id;

    return this.http.delete(url, httpOptions);
  }
}
