import type { IClass } from "./IClass";
import type { ISubject } from "./ISubject";
import type { ITeacher } from "./ITeacher";

export interface IExam {
  _id: string;
  subject: ISubject;
  class: IClass;
  teacher: ITeacher;
  date: string; // ISO string
}