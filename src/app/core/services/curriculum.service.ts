import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Curriculum {
  _id?: string;
  title: string;
  subtitle: string;
  desc: string;
  group: string;
}

@Injectable({
  providedIn: 'root',
})
export class CurriculumService {
  private readonly apiUrl = 'https://localhost:8080/api/curriculums/';

  constructor(private http: HttpClient) {}

  public create(curriculum: Curriculum): Observable<any> {
    return this.http.post(this.apiUrl, curriculum);
  }

  public findAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public findOne(curriculum: Curriculum): Observable<any> {
    const id = curriculum._id;

    return this.http.get(this.apiUrl + id);
  }

  public update(curriculum: Curriculum): Observable<any> {
    const id = curriculum._id;

    return this.http.put(this.apiUrl + id, curriculum);
  }

  public delete(curriculum: Curriculum): Observable<any> {
    const id = curriculum._id;

    return this.http.delete(this.apiUrl + id);
  }
}
