import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewTeacher } from '../models/new-teacher';
import { Teacher } from './../models/teacher';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private readonly apiUrl = 'http://localhost:8080/api/teachers/';

  constructor(private http: HttpClient) {}

  public getAllTeachers() {
    return this.http.get(this.apiUrl);
  }

  public postTeacher(newTeacher: NewTeacher) {
    return this.http.post(this.apiUrl, newTeacher, httpOptions);
  }

  public updateTeacher(teacher: Teacher) {
    var id = teacher._id;
    let url = this.apiUrl + id;

    return this.http.put(url, teacher, httpOptions);
  }

  public deleteTeacher(teacher: Teacher) {
    let id = teacher._id;
    let url = this.apiUrl + id;

    return this.http.delete(url, httpOptions);
  }
}
