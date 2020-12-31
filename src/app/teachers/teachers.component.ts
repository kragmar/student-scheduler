import { MatDialog } from '@angular/material/dialog';
import { TeacherService, Teacher } from './../core/services/teacher.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OkDialogComponent } from '../shared/components/ok-dialog/ok-dialog.component';

@Component({
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  teacherForm: FormGroup;

  search = false;
  selectedTeacher: Teacher;

  teachers: Teacher;

  editing = false;
  privileges = ['Admin', 'Igazgató', 'Tanár'];

  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.formBuilder.group({
      name: [''],
      email: ['', Validators.email],
      phone: [''],
      privileges: [{ value: '', disabled: !this.editing }],
    });
    this.getTeachers();
  }

  getTeachers(): void {
    this.teacherService.findAll().subscribe((data) => (this.teachers = data));
  }

  updateForm(): void {
    this.teacherForm.setValue({
      name: this.selectedTeacher.name,
      email: this.selectedTeacher.email,
      phone: this.selectedTeacher.phone,
      privileges: this.selectedTeacher.privileges,
    });
  }

  editTeacher(): void {
    this.editing = true;
    this.teacherForm.get('privileges').enable();
  }

  updateTeacher(): void {
    // Abort if student form is invalid
    if (this.teacherForm.invalid) {
      return;
    }

    const teacher = this.teacherForm.value;
    teacher._id = this.selectedTeacher._id;

    // Update student data
    this.teacherService.update(teacher).subscribe();

    // Open dialog with OK message
    this.openOkDialog('A tanár adatai frissültek!');

    // Reset editing button
    this.editing = false;
  }

  cancelUpdate(): void {
    this.updateForm();
    this.editing = false;
  }

  openOkDialog(message: string): void {
    const dialogRef = this.dialog.open(OkDialogComponent, {
      width: 'fit-content',
      data: { message: message },
      panelClass: 'ok-dialog',
    });
    dialogRef.afterClosed().subscribe(() => this.getTeachers());
  }
}
