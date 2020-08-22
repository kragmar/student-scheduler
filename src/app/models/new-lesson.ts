import { Teacher } from './teacher';
import { Student } from './student';
export class NewLesson {
  date: Date;
  start: String;
  type: String;
  student: Student;
  teacher: Teacher;
}
