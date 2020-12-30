import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  /* public getAllTeachers() {
    return this.http.get(this.apiUrl);
  }

  public postTeacher(newTeacher: NewTeacher) {
    return this.http.post(this.apiUrl, newTeacher, httpOptions);
  }

  public updateTeacher(teacher: Teacher) {
    const id = teacher._id;
    const url = this.apiUrl + id;

    return this.http.put(url, teacher, httpOptions);
  }

  public deleteTeacher(teacher: Teacher) {
    const id = teacher._id;
    const url = this.apiUrl + id;

    return this.http.delete(url, httpOptions);
  } */
}
