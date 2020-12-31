import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Lesson, LessonService } from '../core/services/lesson.service';
import { DeleteStudentDialogComponent } from './delete-student-dialog/delete-student-dialog.component';
import { Student, StudentService } from '../core/services/student.service';
import { NewStudentDialogComponent } from './new-student-dialog/new-student-dialog.component';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OkDialogComponent } from '../shared/components/ok-dialog/ok-dialog.component';
import { NewLessonDialogComponent } from './new-lesson-dialog/new-lesson-dialog.component';

// Date localization for date pipe
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
registerLocaleData(localeHu, 'hu');

@Component({
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit, AfterViewInit {
  studentForm = this.fb.group({
    name: ['', Validators.pattern('[a-zA-Z\u0080-\uFFFF ]*')],
    email: ['', Validators.email],
    phone: ['', Validators.pattern('[2357][0][0-9]{7}')],
    birthDate: [''],
  });

  search = false;
  students: Student[];
  selectedStudent: Student = <Student>{};

  editing = false;

  lessons: Lesson[];
  displayedColums = ['date', 'time', 'curriculum'];
  lessonsData = new MatTableDataSource<Lesson>(this.lessons);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private lessonService: LessonService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.getLessonsByStudentId();
  }

  getStudents(): void {
    this.studentService.findAll().subscribe((data) => (this.students = data));
  }

  getLessonsByStudentId(): void {
    this.lessonService
      .findAllByStudentId(this.selectedStudent)
      .subscribe((data: Lesson[]) => {
        this.lessons = data;
        this.lessonsData.data = this.lessons as Lesson[];
      });
  }

  ngAfterViewInit(): void {
    this.lessonsData.sort = this.sort;
  }

  openOkDialog(message: string): void {
    const dialogRef = this.dialog.open(OkDialogComponent, {
      width: 'fit-content',
      data: { message: message },
      panelClass: 'ok-dialog',
    });
    dialogRef.afterClosed().subscribe(() => this.getStudents());
  }

  openNewStudentDialog(): void {
    const dialogRef = this.dialog.open(NewStudentDialogComponent, {
      width: 'fit-content',
    });
  }

  openDeleteStudentDialog(): void {
    const dialogRef = this.dialog.open(DeleteStudentDialogComponent, {
      width: 'fit-content',
      data: { studentsValue: this.students },
    });
  }

  openNewLessonDialog(): void {
    const dialogRef = this.dialog.open(NewLessonDialogComponent, {
      width: 'fit-content',
      data: { student: this.selectedStudent },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.openOkDialog('Új óra sikeresen hozzáadva');
      }
      this.getLessonsByStudentId();
    });
  }

  updateForm(): void {
    // Update student form's values
    this.studentForm.setValue({
      name: this.selectedStudent.name,
      email: this.selectedStudent.email,
      phone: this.selectedStudent.phone,
      birthDate: this.selectedStudent.birthDate,
    });

    this.lessonService
      .findAllByStudentId(this.selectedStudent)
      .subscribe((data) => (this.lessons = data));
  }

  updateStudent(): void {
    // Abort if student form is invalid
    if (this.studentForm.invalid) {
      return;
    }

    const student: Student = {
      _id: this.selectedStudent._id,
      name: this.studentForm.get('name').value,
      email: this.studentForm.get('email').value,
      phone: this.studentForm.get('phone').value,
      birthDate: this.studentForm.get('birthDate').value,
    };

    // Update student data
    this.studentService.update(student).subscribe();

    // Open dialog with OK message
    this.openOkDialog('A tanuló adatai frissültek!');

    // Reset editing button
    this.editing = false;
  }

  cancelUpdate(): void {
    // Reset any changes
    this.updateForm();
    this.editing = false;
  }
}
