import { Lesson } from './../services/lesson.service';
import { Component, OnInit } from '@angular/core';
import { LessonService } from '../services/lesson.service';

@Component({
  selector: 'sg-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor() {}
  lessons: Lesson[];

  ngOnInit(): void {}
  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    this.lessonService.findAll().subscribe((result) => (this.lessons = result));
  }
}
