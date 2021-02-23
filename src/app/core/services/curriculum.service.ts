import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';

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
  private readonly apiUrl = '/api/curriculums/';

  public cachedCurriculums: Observable<Curriculum[]>;

  constructor(private http: HttpClient) {}

  public create(curriculum: Curriculum): Observable<any> {
    return this.http.post(this.apiUrl, curriculum);
  }

  public findAll(): Observable<any> {
    if (!this.cachedCurriculums) {
      this.cachedCurriculums = this.http.get(this.apiUrl).pipe(
        map((data) => data as Curriculum[]),
        publishReplay(1),
        refCount()
      );
    }

    return this.cachedCurriculums;
  }

  public findAllB(): Observable<any> {
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
