import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import clientRoutes from './clientRoutes';
import authRoutes from './authRoutes';
import adminRoutes from './adminRoutes';
import NotFound from '../components/NotFound';

const router = createBrowserRouter([
    ...clientRoutes,
    ...authRoutes,
    ...adminRoutes,
    {
        path: '*',
        Component: NotFound,
    },
]);
const AppRoute = () => {
    return <RouterProvider router={router} />;
};
export default AppRoute;
