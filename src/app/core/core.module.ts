import { TeacherService } from './services/teacher.service';
import { StudentService } from './services/student.service';
import { LessonService } from './services/lesson.service';
import { DateCalculatorService } from './services/date-calculator.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AuthGuard,
    AuthService,
    DateCalculatorService,
    LessonService,
    StudentService,
    TeacherService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module!');
    }
  }
}
