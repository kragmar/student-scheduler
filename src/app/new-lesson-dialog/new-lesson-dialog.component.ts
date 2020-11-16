import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LessonService, Lesson } from './../services/lesson.service';

@Component({
  templateUrl: './new-lesson-dialog.component.html',
  styleUrls: ['./new-lesson-dialog.component.css'],
})
export class NewLessonDialogComponent implements OnInit {
  newLessonForm = this.fb.group({
    date: ['', Validators.required],
    type: ['', Validators.required],
    recurring: [true],
  });

  days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
  times = [
    '12:50',
    '13:40',
    '14:30',
    '15:20',
    '16:10',
    '17:00',
    '17:50',
    '18:40',
  ];
  types = ['Tanóra', 'Gyakorló óra'];

  constructor(
    private fb: FormBuilder,
    private lessonService: LessonService,
    public dialogRef: MatDialogRef<NewLessonDialogComponent>
  ) {}

  ngOnInit(): void {}

  getValue(control: string) {
    return this.newLessonForm.get(control).value;
  }

  onSubmit() {
    if (this.newLessonForm.invalid) {
      return;
    }

    let newLesson: Lesson = {
      date: null,
      type: '',
      recurring: null,
      studentId: '',
      teacherId: '',
    };

    newLesson = this.newLessonForm.value;
  }

  createLesson(lesson: Lesson) {
    this.lessonService.create(lesson).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
