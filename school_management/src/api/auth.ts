import axios from 'axios';
import type { ITeacher } from '../types/ITeacher';
import api from './api';
// interface IRegister {
//     userName: string;
//     email: string;
//     password: string;
// }
interface ILogin {
    email: string;
    password: string;
}
export const registerAuth = async (body: ITeacher) => {
    const { data } = await api.post('auth/register', body);
    return data;
};
export const loginAuth = async (body: ILogin) => {
    const { data } = await api.post('auth/login', body);
    return data;
};

export const changePassword = (data: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
    return api.post('auth/change-password', data);
};

export const forgotPassword = (data: { email: string }) => {
    return api.post('auth/forgot-password', data);
};

export const resetPassword = (data: { token: string; newPassword: string; confirmPassword: string }) => {
    return api.post('auth/reset-password', data);
};
const API = 'http://localhost:8888/auth';

export const getInviteInfo = (token: any) => axios.get(`${API}/invite-info?token=${token}`);

export const completeRegister = (data: any) => axios.patch(`${API}/complete-register`, data);
