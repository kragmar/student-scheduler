import { NewStudentComponent } from './../new-student/new-student.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(NewStudentComponent, {
      width: 'fit-content',
    });
  }

  onSubmit() {}
}
