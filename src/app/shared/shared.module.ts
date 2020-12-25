import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OkDialogComponent } from './ok-dialog/ok-dialog.component';

@NgModule({
  declarations: [OkDialogComponent, SidebarComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OkDialogComponent,
    SidebarComponent,
  ],
})
export class SharedModule {}
