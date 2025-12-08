import z from 'zod';

export const studentSchema = z.object({
    name: z.string().min(1, 'Nhập tên đi bro'),
    email: z.string().email('Email sai rồi'),
    sex: z.enum(['female', 'male'] as const),
    phone: z.string().regex(/^0[0-9]{9}$/, 'Số điện thoại 10 số nha'),
    address: z.string().min(1, 'Nhập địa chỉ đi'),
    photo: z.string().optional().default(''),
    class: z.string().min(1, 'Chọn lớp đi'),
    studentId: z.string().optional(),
});
