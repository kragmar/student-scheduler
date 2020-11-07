import { DeleteStudentDialogComponent } from './../delete-student-dialog/delete-student-dialog.component';
import { StudentPayload, StudentService } from './../services/student.service';
import { NewStudentDialogComponent } from '../new-student-dialog/new-student-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  studentForm = this.fb.group({
    name: [''],
    email: [''],
    telnum: [''],
    birthdate: [''],
  });

  search = false;
  students: StudentPayload[];
  selectedStudent: StudentPayload = {
    name: '',
    email: '',
    telNum: '',
    birthDate: null,
  };

  editing = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.studentService.findAll().subscribe((data) => (this.students = data));
  }

  setInputValues() {
    this.studentForm.setValue({
      name: this.selectedStudent.name,
      email: this.selectedStudent.email,
      telNum: this.selectedStudent.telNum,
      birthDate: this.selectedStudent.birthDate,
    });
  }

  openNewStudentDialog() {
    const dialogRef = this.dialog.open(NewStudentDialogComponent, {
      width: 'fit-content',
    });
  }

  openDeleteStudentDialog() {
    const dialogRef = this.dialog.open(DeleteStudentDialogComponent, {
      width: 'fit-content',
      data: { studentsValue: this.students },
    });
  }

  updateStudent() {
    let student: StudentPayload = this.studentForm.value;
  }

  onSubmit() {}
}
