import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // template: ` <ejs-schedule> </ejs-schedule> `,
  templateUrl: './app.component.html',
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css'],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  workingHours: string[] = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
  ];

  selectedHours = [[], [], [], [], [], [], []];
}
