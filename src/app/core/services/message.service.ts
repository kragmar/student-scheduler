import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Message {
  _id?: string;
  title: string;
  message: string[];
  type: string;
  teacherId: string;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly apiUrl = 'http://localhost:8080/api/messages/';

  constructor(private http: HttpClient) {}

  public create(message: Message): Observable<any> {
    return this.http.post(this.apiUrl, message);
  }

  public findAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public update(message: Message): Observable<any> {
    const id = message._id;

    return this.http.put(this.apiUrl + id, message);
  }

  public delete(message: Message): Observable<any> {
    const id = message._id;

    return this.http.delete(this.apiUrl + id);
  }
}
