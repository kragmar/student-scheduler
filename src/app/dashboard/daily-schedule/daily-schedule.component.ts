import { TeacherService } from './../../core/services/teacher.service';
import { CurriculumService } from './../../core/services/curriculum.service';
import { LessonService, Lesson } from './../../core/services/lesson.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.css'],
})
export class DailyScheduleComponent implements OnInit {
  lessons: Lesson[];
  filteredLessons: Lesson[] = new Array();
  groupedLessons: Lesson[][] = new Array();
  tableColumns: string[] = ['name', 'type', 'curriculum'];

  constructor(
    private lessonService: LessonService,
    private teacherService: TeacherService,
    private curriculumService: CurriculumService
  ) {}

  ngOnInit(): void {
    this.lessonService.findAllToday().subscribe((data) => {
      this.lessons = data;
      this.filterLessonsByTeacher();
      this.groupLessons();
    });
    this.curriculumService.findAll().subscribe();
  }

  filterLessonsByTeacher(): void {
    const teacherId = this.teacherService.currentUser;
    for (const lesson of this.lessons) {
      if (lesson.teacherId === teacherId) {
        this.filteredLessons.push(lesson);
      }
    }
  }

  groupLessons(): void {
    let j = 0;
    let duplicateLessons = new Array<Lesson>();
    for (let i = 0; i < this.filteredLessons.length; i++) {
      const compareToDate = new Date(this.filteredLessons[i].date);
      const lessonDate = new Date(this.filteredLessons[j].date);

      if (lessonDate.getTime() === compareToDate.getTime()) {
        duplicateLessons.push(this.filteredLessons[i]);
        if (i + 1 === this.filteredLessons.length) {
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
