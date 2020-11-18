import { Lesson, LessonService } from './lesson.service';
import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';

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

  getEmptyDate() {
    var date = new Date();
    date.setHours(12, 50, 0, 0);
    let day = dayjs(date);
    day = day.add(1, 'day');

    console.log(day);

    let datetime = day.toDate().getTime();

    let lessons: Lesson[] = [];
    this.lessonService.findAllAfterToday(datetime).subscribe(
      (res) => {
        lessons = res;
      },
      (err) => {
        console.log(err);
      },
      () => {
        let emptyDates: Date[];
        console.log(day.toDate().getTime());
        for (const lesson of lessons) {
          let date = dayjs(lesson.date);
          date = date.add(-1, 'hour');

          if (day.isSame(date)) {
            day = day.add(50, 'minute');
            console.log(day);
            console.log('ASD');
            console.log(lesson);
          } else {
            console.log('DSA');
            console.log(lesson);
          }
        }
      }
    );
  }
}
