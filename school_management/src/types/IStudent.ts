export interface IStudent {
    _id?: string | number;
    studentId?: string;
    sex: 'female' | 'male';
    name: string;
    email: string;
    photo?: string;
    phone: string;
    class: string;
    address: string;
}
