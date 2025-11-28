import type { IClass } from './IClass';

export interface IStudent {
    _id: string;
    studentId: string;
    sex: string;
    name: string;
    email: string;
    photo: string;
    phone: string;
    grade: number;
    class: IClass | string;
    address: string;
}
