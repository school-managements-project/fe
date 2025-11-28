import type { IClass } from '../types/IClass';

import api from './api';

export const getClass = async () => {
    const { data } = await api.get('class');
    return data;
};
export const createClass = async (body: IClass) => {
    const { data } = await api.post('class', body);
    return data;
};
export const getClassDetail = async (id: string) => {
    const { data } = await api.get(`class/${id}`);
    return { data };
};
export const updateClass = async (id: string, body: IClass) => {
    const { data } = await api.put(`class/${id}`, body);
    return { data };
};
export const deleteClass = async (id: string) => {
    const { data } = await api.delete(`class/${id}`);
    return { data };
};
