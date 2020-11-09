import { StudentService, StudentPayload } from '../services/student.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Time } from '@angular/common';

@Component({
  templateUrl: './new-student-dialog.component.html',
  styleUrls: ['./new-student-dialog.component.css'],
})
export class NewStudentDialogComponent implements OnInit {
  newStudentForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    telNum: ['', Validators.required],
    birthDate: [''],
    firstTimeDate: [''],
    firstTimeTime: [''],
  });

  newStudent: StudentPayload = {
    name: '',
    email: '',
    phone: '',
    birthDate: null,
  };

  times: Time[];
  selectedTime: Time;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    public dialogRef: MatDialogRef<NewStudentDialogComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.newStudentForm.invalid) {
      return;
    }

    this.newStudent = this.newStudentForm.value;
    this.createStudent();

    this.dialogRef.close();
  }

  createStudent() {
    this.studentService.create(this.newStudent).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
