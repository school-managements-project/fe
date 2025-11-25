import axios from 'axios';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: 'https://api-class-o1lo.onrender.com/api/thuannh/',
});
export default api