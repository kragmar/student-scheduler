import { StudentService, StudentPayload } from './../services/student.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css'],
})
export class NewStudentComponent implements OnInit {
  newStudentForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    telnum: ['', Validators.required],
    birthdate: [''],
  });

  newStudent: StudentPayload = {
    name: '',
    email: '',
    telNum: '',
    birthDate: null,
  };

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    public dialogRef: MatDialogRef<NewStudentComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.newStudentForm.invalid) {
      return;
    }

    this.newStudent = this.newStudentForm.value;
    this.create();

    this.dialogRef.close();
  }

  create() {
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
