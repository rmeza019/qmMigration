import { Moment } from 'moment';

export interface ISchedule {
  id?: number;
  day?: string;
  startTime?: Moment;
  endTime?: Moment;
}

export class Schedule implements ISchedule {
  constructor(public id?: number, public day?: string, public startTime?: Moment, public endTime?: Moment) {}
}
