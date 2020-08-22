import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewStudent } from '../models/new-student';
import { Student } from './../models/student';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly apiUrl = 'http://localhost:8080/api/students/';

  constructor(private http: HttpClient) {}

  public getAllStudents() {
    return this.http.get(this.apiUrl);
  }

  public postStudent(newStudent: NewStudent) {
    return this.http.post(this.apiUrl, newStudent, httpOptions);
  }

  public updateStudent(student: Student) {
    var id = student._id;
    let url = this.apiUrl + id;

    return this.http.put(url, student, httpOptions);
  }

  public deleteStudent(student: Student) {
    let id = student._id;
    let url = this.apiUrl + id;

    return this.http.delete(url, httpOptions);
  }
}
