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
  // define configs
  compactHeader = {
    rows: [
      {
        cols: [
          "prev",
          "date",
          "next",
        ]
      },
      {
        cols: [
          "month",
          "week",
          "agenda",
          "spacer",
          "today"
        ]
      }
    ]
  };

  fullHeader = [
    "day",
    "week",
    "month",
    "date",
    "prev",
    "today",
    "next"
  ];

  constructor(private eventService: EventService) {
    this.resetConfig = this.resetConfig.bind(this)
  }
  ngOnInit() {
    scheduler.plugins({
      agenda_view: true
    });
    this.resetConfig();
    scheduler.attachEvent("onBeforeViewChange", this.resetConfig);
    scheduler.attachEvent("onSchedulerResize", this.resetConfig);
    scheduler.i18n.setLocale("es");
    scheduler.config.responsive_lightbox = true; // responsive lightbox
    scheduler.config.date_format = "%Y-%n-%j %H:%i";
    scheduler.init(this.schedulerContainer.nativeElement, new Date(2023, 12, 15), "agenda");
    this.eventService.get()
      .then((data) => {
        scheduler.parse(data);
      });
  }

  resetConfig() {
    let header;
    if (window.innerWidth < 1000) {
      header = this.compactHeader;
    } else {
      header = this.fullHeader;
    }
    scheduler.config.header = header;
    return true;
  }


}
