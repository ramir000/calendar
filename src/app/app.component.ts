import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { scheduler } from 'dhtmlx-scheduler';
import * as moment from 'moment';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [EventService]
})
export class AppComponent implements OnInit {
  @ViewChild("scheduler_here", { static: true }) schedulerContainer!: ElementRef;

  constructor(private eventService: EventService) { }
  ngOnInit() {
    scheduler.plugins({
      agenda_view: true
    });
    scheduler.config.date_format = "%Y-%m-%d %H:%i";
    scheduler.init(this.schedulerContainer.nativeElement, new Date(2023, 12, 15), "week");
    this.eventService.get()
      .then((data) => {
        scheduler.parse(data);
      });
  }

}
