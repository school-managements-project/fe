import z from 'zod';

export const teacherSchema = z.object({
    name: z.string().min(1, 'Nhập tên đi bro'),
    email: z.string().email('Email sai rồi'),
    sex: z.enum(['female', 'male'] as const),
    phone: z.string().regex(/^0[0-9]{9}$/, 'Số điện thoại 10 số nha'),
    address: z.string().min(1, 'Nhập địa chỉ đi'),
    photo: z.string().optional().default(''),
    subjects: z.array(z.string()),
    classes: z.array(z.string()),
    teacherId: z.string().optional()
});
