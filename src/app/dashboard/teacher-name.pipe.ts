import { TeacherService } from './../core/services/teacher.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teacherName',
})
export class TeacherNamePipe implements PipeTransform {
  constructor(private teacherService: TeacherService) {}

  transform(teacherId: string): string {
    if (!this.teacherService.cachedTeachers) {
      return 'ERROR';
    }

    let teachers = [];

    this.teacherService.findAll().subscribe((data) => (teachers = data));

    return teachers.find((teacher) => teacher._id === teacherId)
      ? teachers.find((teacher) => teacher._id === teacherId).name
      : 'ERROR';
  }
}
