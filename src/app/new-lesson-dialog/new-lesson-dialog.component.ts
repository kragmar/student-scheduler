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
    recurring: [false],
  });

  days: string[];
  times: string[];
  emptyDates: Date[];
  emptyTimes: Date[];
  types = ['Tanóra', 'Gyakorló óra'];

  constructor(
    private fb: FormBuilder,
    private lessonService: LessonService,
    private dateCalcService: DateCalculatorService,
    public dialogRef: MatDialogRef<NewLessonDialogComponent>
  ) {}

  ngOnInit(): void {
    this.days = this.dateCalcService.days;
    this.times = this.dateCalcService.times;
    this.dateCalcService.getEmptyDates().subscribe(
      (res) => (this.emptyDates = res),
      (err) => console.log(err)
    );
    this.newLessonForm.get('date').valueChanges.subscribe((res) => {
      this.getEmptyTimes(res);
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

  getEmptyTimes(date: Date) {
    console.log(this.emptyDates);
    this.emptyTimes = this.emptyDates.filter((emptyDate, index, self) => {
      self.findIndex((d) => d.getDate() === date.getDate()) === index;
    });
    console.log(this.emptyTimes);
  }

  getValue(control: string) {
    return this.newLessonForm.get(control).value;
  }

  onSubmit() {
    if (this.newLessonForm.invalid) {
      return;
    }

    let newLesson: Lesson;

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
