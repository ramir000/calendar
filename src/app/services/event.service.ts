import { Injectable } from '@angular/core';
import { Event } from "../models/event";
import * as moment from 'moment';
import * as momentRange from 'moment-range';
const moments = momentRange.extendMoment(moment);
@Injectable()
export class EventService {
  steps = [24, 72]
  color = ['#dc5faf', '#43a743']
  calc() {
    let date = moment("2023-12-15 6:45", "YYYY-MM-DD HH:mm")
    let dias: Event[] = []
    for (let index = 0; index < 60; index++) {
      let d = this.divideDate(
        index,
        this.steps[index % 2] == 24 ? "trabajo" : "descanzo",
        date.format("YYYY-MM-DD HH:mm"),
        date.add(this.steps[index % 2], 'hours').format("YYYY-MM-DD HH:mm"),
        this.color[index % 2]
      )
      d.forEach((e, index) => {
        e.id = dias.length + index + Math.random() * 10
        dias.push(e)
      })
    }
    return dias
  }
  
  get(): Promise<Event[]> {
    return Promise.resolve(this.calc());
  }

  divideDate(id: any, text: string, start: any, end: any, color:any) {
    const result = []
    let currentDate = moment(start).format("YYYY-MM-DD HH:mm")
    let rRange = moment(start).endOf('day').format("YYYY-MM-DD HH:mm")
    while (moment(currentDate, "YYYY-MM-DD HH:mm").isBefore(moment(end))) {
      let range = {
        "id": id,
        "text": text,
        "start_date": currentDate,
        "end_date": rRange,
        color,
        textColor : 'white'
      }
      currentDate = moment(rRange).endOf('day').add(1, 'minutes').format("YYYY-MM-DD HH:mm")
      rRange = moment(rRange, "YYYY-MM-DD HH:mm").endOf('day').add(1, 'minutes').endOf('day').format("YYYY-MM-DD HH:mm")
      result.push(range)
    }
    result[result.length - 1].end_date = end
    return result
  }
}