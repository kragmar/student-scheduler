import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { WeeklyCalendarComponent } from './weekly-calendar/weekly-calendar.component';
import { SharedModule } from '../shared/shared.module';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { MessageBoardComponent } from './message-board/message-board.component';

@NgModule({
  declarations: [
    DashboardComponent,
    WeeklyCalendarComponent,
    DailyScheduleComponent,
    MessageBoardComponent,
  ],
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
