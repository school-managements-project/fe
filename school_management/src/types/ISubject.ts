import type { ITeacher } from './ITeacher';

export interface ISubject {
    _id?: string | number;
    name: string;
    teachers: ITeacher[] | string[];
}
