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
    name: ['', Validators.pattern('[a-zA-Z\u0080-\uFFFF ]*')],
    email: [''],
    phone: ['', Validators.pattern('[2357][0][0-9]{7}')],
    birthdate: [''],
  });

  search = false;
  students: StudentPayload[];
  selectedStudent: StudentPayload = {
    name: '',
    email: '',
    phone: '',
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
      phone: this.selectedStudent.phone,
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
    if (this.studentForm.invalid) {
      return;
    }

    let student: StudentPayload = {
      _id: this.selectedStudent._id,
      name: this.studentForm.get('name').value,
      email: this.studentForm.get('email').value,
      phone: this.studentForm.get('phone').value,
      birthDate: this.studentForm.get('birthDate').value,
    };
    student._id = this.selectedStudent._id;
    this.studentService.update(student).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {}
}
