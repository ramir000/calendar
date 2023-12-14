import { Injectable } from '@angular/core';
import { Event } from "../models/event";
import * as moment from 'moment';

@Injectable()
export class EventService {
  steps = [24, 72]
  calc() {
    let date = moment("2023-12-15 6:45", "YYYY-MM-DD hh:mm")
    const dias: Event[] = []
    for (let index = 0; index < 60; index++) {
      dias.push({
        "id": dias.length,
        "text": this.steps[index % 2] == 24 ? "trabajo" : "descanzo",
        "start_date": date.format("YYYY-MM-DD hh:mm"),
        "end_date": date.add(this.steps[index % 2], 'hours').format("YYYY-MM-DD hh:mm")
      })

    }
    console.log(dias)
    return dias
  }
  get(): Promise<Event[]> {
    return Promise.resolve(this.calc());
  }
}