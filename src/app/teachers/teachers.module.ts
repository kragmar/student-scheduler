import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { TeacherDialogComponent } from './teacher-dialog/teacher-dialog.component';

@NgModule({
  declarations: [TeachersComponent, TeacherDialogComponent],
  imports: [CommonModule, SharedModule, TeachersRoutingModule],
})
export class TeachersModule {}
