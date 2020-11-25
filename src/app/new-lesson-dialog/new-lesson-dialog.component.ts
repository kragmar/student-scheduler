import { DateCalculatorService } from './../services/date-calculator.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LessonService, Lesson } from './../services/lesson.service';
import { Optional } from '@angular/core';
import { Student } from '../services/student.service';
import * as dayjs from 'dayjs';

@Component({
  templateUrl: './new-lesson-dialog.component.html',
  styleUrls: ['./new-lesson-dialog.component.css'],
})
export class NewLessonDialogComponent implements OnInit {
  newLessonForm = this.fb.group({
    recurring: [false],
    date: ['', Validators.required],
    time: ['', Validators.required],
    type: ['', Validators.required],
  });

  student: Student;

  days: string[];
  times: string[];
  fullDates: Date[];
  emptyTimes: Date[];
  types = ['Tanóra', 'Gyakorló óra'];

  constructor(
    private fb: FormBuilder,
    private lessonService: LessonService,
    private dateCalcService: DateCalculatorService,
    public dialogRef: MatDialogRef<NewLessonDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.student = data.student;
  }

  ngOnInit(): void {
    this.days = this.dateCalcService.days;
    this.times = this.dateCalcService.times;
    this.dateCalcService.getEmptyDates().subscribe(
      (res) => (this.emptyDates = res),
      (err) => console.log(err)
    );
    this.newLessonForm.get('date').valueChanges.subscribe((res) => {
      this.emptyTimes = this.getEmptyTimes(res);
    });
  }

  dateFilter = (date: Date): boolean => {
    let result = false;
    this.emptyDates.forEach((item) => {
      if (
        item.getFullYear() == date.getFullYear() &&
        item.getMonth() == date.getMonth() &&
        item.getDate() == date.getDate()
      ) {
        result = true;
      }
    });
    return result;
  };

  isDateInArray(date: Date, dates: Date[]) {
    for (let i = 0; i < dates.length; i++) {
      if (date.getTime() === dates[i].getTime()) {
        return true;
      }
    }
    return false;
  }

  getEmptyTimes(date: Date) {
    let emptyTimes: Date[] = [];

    for (let i = 0; i < this.emptyDates.length; i++) {
      if (this.emptyDates[i].getDate() === date.getDate()) {
        if (!this.isDateInArray(this.emptyDates[i], emptyTimes)) {
          emptyTimes.push(this.emptyDates[i]);
        }
      }
    }

    return emptyTimes;
  }

  getValue(control: string) {
    return this.newLessonForm.get(control).value;
  }

  onSubmit() {
    if (this.newLessonForm.invalid) {
      return;
    }

    let date = new Date(this.getValue('time'));

    let newLesson: Lesson = {
      date: date,
      type: this.getValue('type') === 'Tanóra' ? 'LECTURE' : 'PRACTICE',
      recurring: this.getValue('recurring'),
      studentId: this.student._id,
      teacherId: '5f7225de8ee83902f8c3039f',
    };

    this.createLesson(newLesson);
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
