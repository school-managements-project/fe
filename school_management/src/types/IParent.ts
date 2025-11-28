import type { IStudent } from "./IStudent";

export interface IParent {
  _id: string;
  name: string;
  students: IStudent[];
  email: string;
  phone: string;
  address: string;
}