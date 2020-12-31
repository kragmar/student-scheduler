import { TeacherService, Teacher } from './../core/services/teacher.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.formBuilder.group({
      name: [''],
      email: ['', Validators.email],
      phone: [''],
      privileges: [{ value: '', disabled: !this.editing }],
    });

    this.teacherService.findAll().subscribe((data) => (this.teachers = data));
  }

  updateForm(): void {
    let privilege = '';
    if (this.selectedTeacher.privileges === 'ADMIN') {
      privilege = 'Admin';
    } else if (this.selectedTeacher.privileges === 'DIRECTOR') {
      privilege = 'Igazgató';
    } else {
      privilege = 'Tanár';
    }

    this.teacherForm.setValue({
      name: this.selectedTeacher.name,
      email: this.selectedTeacher.email,
      phone: this.selectedTeacher.phone,
      privileges: privilege,
    });
  }

  onSubmit(): void {}

  openTeacherDialog(): void {}
}
