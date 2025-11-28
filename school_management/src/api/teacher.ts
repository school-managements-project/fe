import type { IProductQuery } from '../types/IQuery';
import type { ITeacher } from '../types/ITeacher';
import { cleanParams } from '../ultis/cleanupParams';
import api from './api';

export const getTeacher = async (query: IProductQuery) => {
    const params = cleanParams(query);
    const { data } = await api.get('teacher', { params });
    return data;
};
export const createTeacher = async (body: ITeacher) => {
    const { data } = await api.post('teacher', body);
    return data;
};
export const getTeacherDetail = async (id: string) => {
    const { data } = await api.get(`teacher/${id}`);
    return { data };
};
export const updateTeacher = async (id: string, body: ITeacher) => {
    const { data } = await api.put(`teacher/${id}`, body);
    return { data };
};
export const deleteTeacher = async (id: string) => {
    const { data } = await api.delete(`teacher/${id}`);
    return { data };
};
