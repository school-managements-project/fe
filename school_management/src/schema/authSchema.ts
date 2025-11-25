import z from 'zod';

export const registerSchema = z
    .object({
        userName: z.string().min(3, 'Không được dưới 3 ký tự').max(30, 'Không được quá 30 ký tự'),
        email: z.string().email('Không đúng định dạng email'),
        password: z.string().min(6, 'Độ dài password dưới 6 ký tự').max(20, 'Độ dài password trên 20 ký tự'),
        confirmPassword: z.string().min(6, 'Độ dài password dưới 6 ký tự').max(20, 'Độ dài password trên 20 ký tự'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword'],
    })
export const loginSchema = z.object({
    email: z.string().email('Không đúng định dạng email'),
    password: z.string().min(6, 'Độ dài password dưới 6 ký tự').max(20, 'Độ dài password trên 20 ký tự'),
});
