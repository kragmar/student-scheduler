import { DateCalculatorService } from './../services/date-calculator.service';
import { Lesson } from './../services/lesson.service';
import { Component, OnInit } from '@angular/core';
import { LessonService } from '../services/lesson.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'sg-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  lessons: Lesson[] = [];
  days: string[];
  times: string[];

  private today: Date;
  private date: Date;
  week: Date[];
  filteredLessons: Lesson[][][] = new Array();

  daysRange = [0, 1, 2, 3, 4];
  timesRange = [0, 1, 2, 3, 4, 5, 6, 7];

  constructor(
    private lessonService: LessonService,
    private dateCalcService: DateCalculatorService
  ) {
    this.today = new Date();
    this.date = new Date(this.today);
  }

  ngOnInit(): void {
    this.lessonService.findAll().subscribe((result) => (this.lessons = result));
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
