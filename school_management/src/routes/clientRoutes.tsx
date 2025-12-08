import LayoutClient from '../layouts/LayoutClient';
import AdminPage from '../pages/Client/Admin/AdminPage';
import ListStudent from '../pages/Client/Student/ListStudent';
import TeacherPage from '../pages/Client/Teacher/TeacherPage';

const clientRoutes = [
    {
        path: '/',
        element: <LayoutClient />,
        children: [
            {
                index: true,
                Component: AdminPage,
            },
            {
                path: 'students',
                Component: ListStudent,
            },
            {
                path: 'students/:id',
                Component: ListStudent,
            },
            {
                path: 'teachers',
                Component: TeacherPage,
            },
            {
                path: 'teachers/:id',
                Component: TeacherPage,
            },
        ],
    },
];
export default clientRoutes;
