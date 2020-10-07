import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  studentForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    telnum: ['', Validators.required],
    birthdate: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.studentForm.invalid) {
      return;
    }
  }
}
