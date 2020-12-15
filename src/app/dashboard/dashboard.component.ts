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

  constructor(
    private lessonService: LessonService,
    private dateCalcService: DateCalculatorService
  ) {}

  ngOnInit(): void {
    this.lessonService.findAll().subscribe((result) => (this.lessons = result));
    this.days = this.dateCalcService.days;
    this.times = this.dateCalcService.times;
  }

  drop(event: CdkDragDrop<string>): void {}
}
