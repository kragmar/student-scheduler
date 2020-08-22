import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LessonService } from './services/lesson.service';
import { StudentService } from './services/student.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [UserService, StudentService, LessonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
