import type { ITeacher } from './ITeacher';

export interface ISubject {
    _id: string;
    name: string;
    teachers: ITeacher[] | string[];
}
