import { DateCalculatorService } from './../services/date-calculator.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LessonService, Lesson } from './../services/lesson.service';
import { Optional } from '@angular/core';

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

  days: string[];
  times: string[];
  emptyDates: Date[];
  types = ['Tanóra', 'Gyakorló óra'];

  constructor(
    private fb: FormBuilder,
    private lessonService: LessonService,
    private dateCalcService: DateCalculatorService,
    public dialogRef: MatDialogRef<NewLessonDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.emptyDates = data.emptyDates;
  }

  ngOnInit(): void {
    this.days = this.dateCalcService.days;
    this.times = this.dateCalcService.times;
    /* this.emptyDates = this.dateCalcService.getEmptyDates(); */
    console.debug(this.emptyDates);
  }

  dateFilter = (date: Date): boolean => {
    let x = false;
    let y;
    this.emptyDates.forEach((item) => {
      y = item;
      if (
        item.getFullYear() == date.getFullYear() &&
        item.getMonth() == date.getMonth() &&
        item.getDate() == date.getDate()
      ) {
        console.debug('found valid day:' + date);
        x = true;
      }
    });
    console.debug('invalid day:' + date);
    console.debug(y);
    return x;
  };

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
