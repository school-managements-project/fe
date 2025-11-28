import type { IClass } from "./IClass";

export interface IEvent {
  _id: string;
  title: string;
  class: IClass;
  date: string; // ISO string
  startTime: string; // "10:00"
  endTime: string;   // "11:00"
}