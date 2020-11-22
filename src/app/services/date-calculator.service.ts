import { Lesson, LessonService } from './lesson.service';
import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateCalculatorService {
  constructor(private lessonService: LessonService) {}

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

  private addDays(dateParam: dayjs.Dayjs) {
    let date = dayjs(dateParam);

    date = this.resetDate(date);
    if (date.day() === 5) {
      date = date.add(3, 'day');
    } else {
      date = date.add(1, 'day');
    }

    return date;
  }

  private findFullTimes(lessonsParam: Lesson[]) {
    let lessons = new Array<Lesson>(...lessonsParam);

    let emptyDates: Date[] = [];

    let j = 0;
    let count = 0;
    for (let i = 0; i < lessons.length; i++) {
      let lessonDate = new Date(lessons[i].date);
      let date = new Date(lessons[j].date);

      if (lessonDate.getTime() === date.getTime()) {
        count++;
      } else {
        j = i;
        i -= 1;
        count = 0;
      }

      if (count === 3) {
        emptyDates.push(new Date(lessons[j].date));
      }
    }

    return emptyDates;
  }

  public getFullTimes(): Observable<Date[]> {
    const today = new Date();

    let date = dayjs(today);
    date = this.addDays(date);

    let datetime = date.toDate().getTime();
    let emptyDates: BehaviorSubject<Date[]> = new BehaviorSubject([]);

    let lessons: Lesson[] = [];
    this.lessonService.findAllAfterToday(datetime).subscribe(
      (res) => {
        lessons = res;
      },
      (err) => {
        console.log(err);
      },
      () => {
        emptyDates.next(this.findFullTimes(lessons));
      }
    );

    return emptyDates.asObservable();
  }
}
