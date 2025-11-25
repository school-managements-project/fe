import { Navigate } from 'react-router-dom';
import LayoutAdmin from '../layouts/LayoutAdmin';

const adminRoutes = [
    {
        path: '/admin',
        element: <LayoutAdmin />,
        children: [{ index: true, element: <Navigate to="/todos" /> }],
    },
];
export default adminRoutes;
