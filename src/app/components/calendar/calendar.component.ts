import { CalendarOptions } from '@fullcalendar/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarTemplateRef } from '@fullcalendar/angular/private-types';
import { ChangeDetectorRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import kaLocale from '@fullcalendar/core/locales/ka';
import listPlugin from '@fullcalendar/list';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('template') template?: CalendarTemplateRef<HTMLElement>;
  @ViewChild('chooseHourSheduler')
  chooseHourSheduler?: CalendarTemplateRef<HTMLElement>;
  modalRef?: BsModalRef;
  public startDay: any;
  public endDay: any;
  public selectHour: any;
  private _isReserved = new BehaviorSubject<boolean>(false);
  public isReserved$ = this._isReserved.asObservable();

  set isReserved(value: boolean) {
    this._isReserved.next(value);
  }

  get isReserved(): boolean {
    return this._isReserved.value;
  }

  public eventArray: any = [];
  workingHours = [
    { hour: '08:00', available: true },
    { hour: '09:00', available: true },
    { hour: '10:00', available: true },
    { hour: '11:00', available: true },
    { hour: '12:00', available: true },
    { hour: '13:00', available: true },
    { hour: '14:00', available: true },
    { hour: '15:00', available: true },
    { hour: '16:00', available: true },
    { hour: '17:00', available: true },
    { hour: '18:00', available: true },
    { hour: '19:00', available: true },
    { hour: '20:00', available: true },
    { hour: '21:00', available: true },
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locales: [kaLocale],
    locale: 'ka',
    plugins: [dayGridPlugin, interaction, listPlugin],
    selectable: true,

    select: this.handleDateClick.bind(this),
    eventClick: this.handlerGetEvent.bind(this),
    eventAdd: this.handlerAddEvent.bind(this),
    selectAllow: function (selectInfo) {
      // only one week can be selected at a time
      const currentDate = new Date();
      const oneWeekmilliseconds = 604800000;
      const diffTime = Math.abs(
        selectInfo.end.getTime() - currentDate.getTime()
      );
      const selectedDate = new Date(selectInfo.start);
      if (selectedDate < currentDate || diffTime > oneWeekmilliseconds) {
        return false;
      } else {
        return true;
      }
      // background color can be changed. return false to cancel
    },
    events: [this.eventArray],
  };

  constructor(
    private modalService: BsModalService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isReserved$.subscribe((isReserved) => {
      console.log(`isReserved changed to ${isReserved}`);
    });
  }

  ngAfterViewInit() {}

  handleDateClick(arg: any) {
    if (this.modalService.getModalsCount() > 0) {
      this.modalRef?.hide();
      setTimeout(() => {
        this.startDay = arg.startStr;
        this.endDay = arg.endStr;
        this.modalRef = this.modalService.show(this.chooseHourSheduler as any);
        console.log(arg);
        this.ref.detectChanges();
        if (this.isReserved) {
          console.log('is reserved');
          this.isReserved = !this.isReserved;
          this.handlerAddEvent(arg);
        }
      }, 500);
    } else {
      this.startDay = arg.startStr;
      this.endDay = arg.endStr;
      this.modalRef = this.modalService.show(this.chooseHourSheduler as any);
      console.log(arg);

      if (this.isReserved) {
        this.ref.detectChanges();

        console.log('is reserved');
        this.isReserved = !this.isReserved;
        this.handlerAddEvent(arg);
      }
    }
  }

  handlerAddEvent(arg: any) {
    console.log('event click', arg);
    this.modalRef?.hide();
    const rendomEventName = Math.random().toString(36).substring(7);
    const event = {
      title: rendomEventName,
      start: this.startDay,
      end: this.endDay,
      color: 'red',
    };
    this.eventArray = this.eventArray.concat(event);
    this.calendarOptions.events = this.eventArray;
    console.log('event array events', this.calendarOptions.events);
    console.log('event array', this.eventArray);
  }

  handlerGetEvent(arg: any) {
    console.log('event click', arg);
    this.modalRef = this.modalService.show(this.template as any);
  }

  toogleAddEvent() {
    console.log('toogleAddEvent');
    this.modalRef?.hide();
    this.isReserved = !this.isReserved;
    console.log('is res', this.isReserved);
  }
}
