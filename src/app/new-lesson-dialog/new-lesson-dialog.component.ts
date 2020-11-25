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
  fullTimes: Date[];
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
    this.dateCalcService.getFullDates().subscribe((data) => {
      this.fullDates = data;
    });
    this.dateCalcService.getFullTimes().subscribe((data) => {
      this.fullTimes = data;
    });
    this.newLessonForm.get('date').valueChanges.subscribe((data) => {
      this.emptyTimes = this.getEmptyTimes(data);
      console.debug(this.emptyTimes);
    });
  }

  dateFilter = (date: Date): boolean => {
    const today = new Date();
    let result = true;

    this.fullDates.forEach((item) => {
      if (
        item.getFullYear() === date.getFullYear() &&
        item.getMonth() === date.getMonth() &&
        item.getDate() === date.getDate()
      ) {
        result = false;
      }
    });

    let futureDates = date.getTime() > today.getTime();

    return result && date.getDay() !== 0 && date.getDay() !== 6 && futureDates;
  };

  getEmptyTimes(dateParam: Date) {
    let date = dayjs(dateParam);
    date = date.set('hour', 12);
    date = date.set('minute', 50);
    date = date.set('second', 0);

    let emptyTimes: Date[] = [];

    for (let i = 0; i < 8; i++) {
      emptyTimes.push(date.toDate());
      date = date.add(50, 'minute');
    }

    if (this.fullTimes.length > 0) {
      for (let i = 0; i < emptyTimes.length; i++) {
        if (this.fullTimes[i].getTime() === emptyTimes[i].getTime()) {
          emptyTimes.splice(i, 1);
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
