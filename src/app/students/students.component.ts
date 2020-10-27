import { StudentPayload, StudentService } from './../services/student.service';
import { NewStudentComponent } from './../new-student/new-student.component';
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

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.studentService.findAll().subscribe((data) => (this.students = data));
  }

  setInputValues() {
    console.log(this.selectedStudent);
    this.studentForm.setValue({
      name: this.selectedStudent.name,
      email: this.selectedStudent.email,
      telNum: this.selectedStudent.telNum,
      birthDate: this.selectedStudent.birthDate,
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewStudentComponent, {
      width: 'fit-content',
    });
  }

  onSubmit() {}
}
