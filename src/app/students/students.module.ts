import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { SharedModule } from './../shared/shared.module';
import { StudentsComponent } from './students.component';
import { NewStudentDialogComponent } from './new-student-dialog/new-student-dialog.component';
import { DeleteStudentDialogComponent } from './delete-student-dialog/delete-student-dialog.component';
import { NewLessonDialogComponent } from './new-lesson-dialog/new-lesson-dialog.component';

@NgModule({
  declarations: [
    StudentsComponent,
    NewStudentDialogComponent,
    DeleteStudentDialogComponent,
    NewLessonDialogComponent,
  ],
  imports: [CommonModule, StudentsRoutingModule, SharedModule],
})
export class StudentsModule {}
