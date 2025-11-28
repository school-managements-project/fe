import type { ITeacher } from "./ITeacher";

export interface IClass {
  _id: string;
  name: string;
  capacity: number;
  grade: number;
  supervisor: ITeacher;
}