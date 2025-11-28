declare module 'react-big-calendar' {
  export type View = 'month' | 'week' | 'work_week' | 'day' | 'agenda';

  export interface CalendarEvent {
    id?: number | string;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
    color?: string; // custom màu môn học
  }
}
