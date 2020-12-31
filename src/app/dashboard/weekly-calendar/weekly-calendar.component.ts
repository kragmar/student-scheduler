import { Component, OnInit } from '@angular/core';
import { Lesson, LessonService } from '../../core/services/lesson.service';
import { DateCalculatorService } from '../../core/services/date-calculator.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'dashboard-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.css'],
})
export class WeeklyCalendarComponent implements OnInit {
  lessons: Lesson[] = [];
  days: string[];
  times: string[];

  today: Date;
  private date: Date;
  week: Date[];
  filteredLessons: Lesson[][][] = new Array();

  daysRange = [0, 1, 2, 3, 4];
  timesRange = [0, 1, 2, 3, 4, 5, 6, 7];

  editing = false;

  constructor(
    private lessonService: LessonService,
    private dateCalcService: DateCalculatorService
  ) {
    this.today = new Date();
    this.date = new Date(this.today);
  }

  ngOnInit(): void {
    this.lessonService.findAll().subscribe((result) => {
      this.lessons = result;
      this.fillFilteredLessons();
    });
    this.days = this.dateCalcService.days;
    this.times = this.dateCalcService.times;
    this.createWeekArray();
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private calcDiff(index: number): Date {
    const diff = this.date.getDay() - 1 - index;
    this.date.setDate(this.date.getDate() - diff);
    return this.date;
  }

  private createWeekArray(): void {
    this.week = new Array<Date>();

    for (let i = 0; i < this.days.length; i++) {
      const day = new Date(this.calcDiff(i));
      this.week.push(day);
    }
  }

  public goToPrevWeek(): void {
    this.date.setDate(this.date.getDate() - 7);
    this.createWeekArray();
    this.fillFilteredLessons();
  }

  public goToToday(): void {
    this.date.setFullYear(this.today.getFullYear());
    this.date.setMonth(this.today.getMonth());
    this.date.setDate(this.today.getDate());
    this.createWeekArray();
    this.fillFilteredLessons();
  }

  public goToNextWeek(): void {
    this.date.setDate(this.date.getDate() + 7);
    this.createWeekArray();
    this.fillFilteredLessons();
  }

  private filterLessonsByDayAndTime(day: Date, time: string): Lesson[] {
    const filteredLessons = new Array<Lesson>();

    for (let i = 0; i < this.lessons.length; i++) {
      const lessonDate = new Date(this.lessons[i].date);
      const splitTime = time.split(':');
      day.setHours(+splitTime[0], +splitTime[1], 0, 0);

      if (lessonDate.getTime() === day.getTime()) {
        filteredLessons.push(this.lessons[i]);
      }
    }

    return filteredLessons;
  }

  private fillFilteredLessons(): void {
    let i = 0;
    let j = 0;
    for (const day of this.week) {
      this.filteredLessons[i] = new Array();
      for (const time of this.times) {
        const lessons = this.filterLessonsByDayAndTime(day, time);
        this.filteredLessons[i].push(lessons);
        j++;
      }
      i++;
    }
  }
}
