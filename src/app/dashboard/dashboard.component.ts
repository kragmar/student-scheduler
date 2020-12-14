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

  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    this.lessonService.findAll().subscribe((result) => (this.lessons = result));
  }

  drop(event: CdkDragDrop<string>): void {}
}
