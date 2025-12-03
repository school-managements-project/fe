export interface ITeacher {
    _id?: string | number; // ID từ DB (MongoDB ObjectId)
    teacherId?: string; // Mã giáo viên riêng (ví dụ: GV001)
    name: string;
    email: string;
    sex: 'female' | 'male';
    photo?: string; // ảnh đại diện
    phone: string;
    subjects: string[]; // môn dạy
    classes: string[]; // lớp đang phụ trách
    address: string;
}
