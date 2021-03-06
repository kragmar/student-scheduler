import { StudentService } from './../../core/services/student.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentName',
})
export class StudentNamePipe implements PipeTransform {
  constructor(private studentService: StudentService) {}

  transform(studentId: string): string {
    if (!this.studentService.cachedStudents) {
      return 'ERROR';
    }

    let students = [];

    this.studentService.findAll().subscribe((data) => (students = data));

    return students.find((student) => student._id === studentId)
      ? students.find((student) => student._id === studentId).name
      : 'ERROR';
  }
}
