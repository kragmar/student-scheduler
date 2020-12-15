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
}
