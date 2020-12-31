import { TeacherService } from './../core/services/teacher.service';
import { CurriculumService } from './../core/services/curriculum.service';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../core/services/student.service';
import { LessonService } from '../core/services/lesson.service';
@Component({
  selector: 'sg-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private lessonService: LessonService,
    private curriculumService: CurriculumService,
    private teacherService: TeacherService
  ) {}

  getDatas(): void {
    this.studentService.findAll().subscribe();
    this.lessonService.findAll().subscribe();
    this.curriculumService.findAll().subscribe();
    this.teacherService.findAll().subscribe();
  }

  ngOnInit(): void {
    this.getDatas();
  }
}
