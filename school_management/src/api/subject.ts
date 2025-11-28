import type { ISubject } from '../types/ISubject';

import api from './api';

export const getSubject = async () => {
    const { data } = await api.get('subject');
    return data;
};
export const createSubject = async (body: ISubject) => {
    const { data } = await api.post('subject', body);
    return data;
};
export const getSubjectDetail = async (id: string) => {
    const { data } = await api.get(`subject/${id}`);
    return { data };
};
export const updateSubject = async (id: string, body: ISubject) => {
    const { data } = await api.put(`subject/${id}`, body);
    return { data };
};
export const deleteSubject = async (id: string) => {
    const { data } = await api.delete(`subject/${id}`);
    return { data };
};
