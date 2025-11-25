import api from './api';
interface IRegister {
    userName: string;
    email: string;
    password: string;
}
interface ILogin {
    email: string;
    password: string;
}
export const registerAuth = async (body: IRegister) => {
    const { data } = await api.post('auth/register', body);
    return data;
};
export const loginAuth = async (body: ILogin) => {
    const { data } = await api.post('auth/login', body);
    return data;
};
