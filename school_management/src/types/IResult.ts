import type { IClass } from "./IClass";
import type { IStudent } from "./IStudent";
import type { ISubject } from "./ISubject";
import type { ITeacher } from "./ITeacher";

export interface IResult {
  _id: string;
  subject: ISubject;
  class: IClass;
  teacher: ITeacher;
  student: IStudent;
  date: string; // ISO string
  type: "exam" | "assignment";
  score: number;
}