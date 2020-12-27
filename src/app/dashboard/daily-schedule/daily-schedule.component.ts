import { LessonService, Lesson } from './../../core/services/lesson.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.css'],
})
export class DailyScheduleComponent implements OnInit {
  lessons: Lesson[];

  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    this.lessonService
      .findAllToday()
      .subscribe((data) => (this.lessons = data));
  }
}
