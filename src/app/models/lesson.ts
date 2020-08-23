import { Teacher } from './teacher';
import { Student } from './student';
export class Lesson {
  _id: String;
  date: Date;
  start: String;
  type: String;
  student: Student;
  teacher: Teacher;
  createdAt: Date;
  updatedAt: Date;
}
