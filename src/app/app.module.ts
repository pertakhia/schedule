import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCalendar, MatCalendarBody } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import {
  ScheduleModule,
  RecurrenceEditorAllModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
  TimelineViewsService,
  TimelineMonthService,
} from '@syncfusion/ej2-angular-schedule';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { ModalModule } from 'ngx-bootstrap/modal'; // a plugin!

@NgModule({
  declarations: [AppComponent, CalendarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatGridListModule,
    MatCheckboxModule,
    MatNativeDateModule,
    ScheduleModule,
    RecurrenceEditorAllModule,
    ReactiveFormsModule,
    FullCalendarModule,
    ModalModule.forRoot(), // for FullCalendar!
  ],
  providers: [
    MatDatepickerModule,
    MatCalendar,
    MatCalendarBody,
    MatNativeDateModule,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    TimelineViewsService,
    TimelineMonthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
