import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OkDialogComponent } from './components/ok-dialog/ok-dialog.component';
import { StudentNamePipe } from './pipes/student-name.pipe';

@NgModule({
  declarations: [OkDialogComponent, StudentNamePipe],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OkDialogComponent,
    StudentNamePipe,
  ],
})
export class SharedModule {}
