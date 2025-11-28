import type { IClass } from './IClass';
import type { ISubject } from './ISubject';

export interface ITeacher {
    _id: string | number; // ID từ DB (MongoDB ObjectId)
    teacherId: string; // Mã giáo viên riêng (ví dụ: GV001)
    name: string;
    email: string;
    sex:string,
    photo: string; // ảnh đại diện
    phone: string;
    subjects: ISubject[] | string[]; // môn dạy
    classes: IClass[] | string[]; // lớp đang phụ trách
    address: string;
}
