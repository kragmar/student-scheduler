import { DateCalculatorService } from './../services/date-calculator.service';
import { Lesson } from './../services/lesson.service';
import { Component, OnInit } from '@angular/core';
import { LessonService } from '../services/lesson.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'sg-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  lessons: Lesson[];
  days: string[];
  times: string[];

  private today: Date;
  private date: Date;
  week: Date[];

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
  }

  drop(event: CdkDragDrop<string>): void {}

  calcDiff(index: number): Date {
    const diff = this.date.getDay() - 1 - index;
    this.date.setDate(this.date.getDate() - diff);
    return this.date;
  }

  createWeekArray(): void {
    this.week = new Array<Date>();

    for (let i = 0; i < this.days.length; i++) {
      const day = new Date(this.calcDiff(i));
      this.week.push(day);
    }
  }

}
