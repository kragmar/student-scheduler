import { Lesson, LessonService } from './lesson.service';
import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateCalculatorService {
  private fullTimes: Date[] = [];
  private lessons: Lesson[] = [];
  private datetime: number;

  constructor(private lessonService: LessonService) {
    this.datetime = this.getDatetime();
    lessonService.findAllAfterToday(this.datetime).subscribe((data) => {
      this.lessons = data;
      this.findFullTimes(data);
    });
  }

  get times() {
    return [
      '12:50',
      '13:40',
      '14:30',
      '15:20',
      '16:10',
      '17:00',
      '17:50',
      '18:40',
    ];
  }

  get days() {
    return ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
  }

  private resetDate(dateParam: dayjs.Dayjs) {
    let date = dayjs(dateParam);

    date = date.set('hour', 12);
    date = date.set('minute', 50);
    date = date.set('second', 0);
    date = date.set('millisecond', 0);

    return date;
  }

  private getDatetime() {
    const today = new Date();
    let date = dayjs(today);

    date = this.resetDate(date);

    if (date.day() === 5) {
      date = date.add(3, 'day');
    } else {
      date = date.add(1, 'day');
    }

    return date.toDate().getTime();
  }

  private findFullTimes(lessons: Lesson[]) {
    let j = 0;
    let count = 0;
    for (let i = 0; i < lessons.length; i++) {
      const lessonDate = new Date(lessons[i].date);
      const date = new Date(lessons[j].date);

      if (lessonDate.getTime() === date.getTime()) {
        count++;
      } else {
        j = i;
        i -= 1;
        count = 0;
      }

      if (count === 3) {
        this.fullTimes.push(new Date(lessons[j].date));
      }
    }

    return this.fullTimes;
  }

  private findFullDates(fullTimes: Date[]) {
    let j = 0;
    let count = 0;
    const fullDates: Date[] = [];

    if (fullTimes.length > 0) {
      for (let i = 0; i < fullTimes.length; i++) {
        const time = fullTimes[j];

        if (time.getDate() === fullTimes[i].getDate()) {
          count++;
        } else if (count === this.times.length) {
          fullDates.push(fullTimes[i]);
          count = 0;
          j = i;
        }
      }
    } else {
      return [];
    }

    return fullDates;
  }

  public getFullTimes(): Observable<Date[]> {
    const fullTimesSubject: BehaviorSubject<Date[]> = new BehaviorSubject([]);

    fullTimesSubject.next(this.fullTimes);

    return fullTimesSubject.asObservable();
  }

  public getFullDates(): Observable<Date[]> {
    const fullDatesSubject: BehaviorSubject<Date[]> = new BehaviorSubject([]);

    fullDatesSubject.next(this.findFullDates(this.fullTimes));

    return fullDatesSubject.asObservable();
  }
}
