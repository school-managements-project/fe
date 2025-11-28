import type { IClass } from "./IClass";
import type { ISubject } from "./ISubject";
import type { ITeacher } from "./ITeacher";

export interface ILesson {
  _id: string;
  subject: ISubject;
  class: IClass;
  teacher: ITeacher;
}
