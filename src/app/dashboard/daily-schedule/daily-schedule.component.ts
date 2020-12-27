import { LessonService, Lesson } from './../../core/services/lesson.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.css'],
})
export class DailyScheduleComponent implements OnInit {
  lessons: Lesson[];
  groupedLessons: Lesson[][] = new Array();

  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    this.lessonService.findAllToday().subscribe((data) => {
      this.lessons = data;
      this.groupLessons();
    });
  }

  groupLessons(): void {
    let j = 0;
    let duplicateLessons = new Array<Lesson>();
    for (let i = 0; i < this.lessons.length; i++) {
      const compareToDate = new Date(this.lessons[i].date);
      const lessonDate = new Date(this.lessons[j].date);

      if (lessonDate.getTime() === compareToDate.getTime()) {
        duplicateLessons.push(this.lessons[i]);
        if (i + 1 === this.lessons.length) {
          this.groupedLessons.push(duplicateLessons);
        }
      } else {
        j = i;
        i -= 1;
        this.groupedLessons.push(duplicateLessons);
        duplicateLessons = new Array<Lesson>();
      }
    }
  }
}
