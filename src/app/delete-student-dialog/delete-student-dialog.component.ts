import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentPayload, StudentService } from './../services/student.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, Optional } from '@angular/core';

@Component({
  templateUrl: './delete-student-dialog.component.html',
  styleUrls: ['./delete-student-dialog.component.css'],
})
export class DeleteStudentDialogComponent implements OnInit {
  studentsFromPage: StudentPayload[];
  deleteStudentForm = this.fb.group({
    name: [''],
  });
  selectedStudent: StudentPayload;

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentService,
    public dialogRef: MatDialogRef<DeleteStudentDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.studentsFromPage = data.studentsValue;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.deleteStudent();
    this.dialogRef.close();
  }

  deleteStudent() {
    this.studentsService.delete(this.selectedStudent).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
