import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StudentsComponent } from './students/students.component';
import { NewStudentDialogComponent } from './new-student-dialog/new-student-dialog.component';
import { DeleteStudentDialogComponent } from './delete-student-dialog/delete-student-dialog.component';
import { OkDialogComponent } from './ok-dialog/ok-dialog.component';
import { NewLessonDialogComponent } from './new-lesson-dialog/new-lesson-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PageNotFoundComponent,
    SidebarComponent,
    StudentsComponent,
    NewStudentDialogComponent,
    DeleteStudentDialogComponent,
    OkDialogComponent,
    NewLessonDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    // Material Imports
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatExpansionModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'hu-HU' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
