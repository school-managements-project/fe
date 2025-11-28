// src/types/auth.ts
export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';

export interface SessionUser {
    id: number;
    username: string;
    name: string;
    surname: string;
    email: string;
    role: Role;
    img?: string;
}
