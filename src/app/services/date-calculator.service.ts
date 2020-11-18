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

  private createDatesArray(dateParam: Date) {
    let date = dayjs(dateParam);
    let arr: Date[] = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 3; j++) {
        arr.push(date.toDate());
      }
      date = date.add(50, 'minute');
    }
    return arr;
  }

  private calculateEmptyDates(
    today: Date,
    day: dayjs.Dayjs,
    dates: Date[],
    lessons: Lesson[]
  ) {
    let emptyDates: Date[] = [];
    let j = 0;

    for (let i = 0; j < lessons.length; i++) {
      let date = dayjs(dates[i]);
      let lessonDate = dayjs(lessons[j].date);
      lessonDate = lessonDate.add(-1, 'hour');

      if (day.date() === lessonDate.date() && date.isSame(lessonDate)) {
        j++;
        if (j === lessons.length) {
          emptyDates.push(...dates.slice(i + 1, dates.length));
        }
      } else if (day.date() === lessonDate.date() && !date.isSame(lessonDate)) {
        emptyDates.push(date.toDate());
      } else if (day.date() !== lessonDate.date()) {
        emptyDates.push(...dates.slice(i, dates.length));

        let diff = day.date() - today.getDate();
        day = dayjs(today);
        day = day.add(diff + 1, 'day');
        dates = this.createDatesArray(day.toDate());
        i = -1;
      }
    }

    return emptyDates;
  }

  public getEmptyDates(): Observable<Date[]> {
    var today = new Date();
    today.setHours(12, 50, 0, 0);

    let day = dayjs(today);
    day = day.add(1, 'day');

    let datetime = day.toDate().getTime();
    var emptyDates: BehaviorSubject<Date[]> = null;

    let lessons: Lesson[] = [];
    this.lessonService.findAllAfterToday(datetime).subscribe(
      (res) => {
        lessons = res;
      },
      (err) => {
        console.log(err);
      },
      () => {
        let dates = this.createDatesArray(day.toDate());
        let arr = this.calculateEmptyDates(today, day, dates, lessons);
        console.log(arr);
        emptyDates.next(this.calculateEmptyDates(today, day, dates, lessons));
      }
    );

    return emptyDates.asObservable();
  }
}
