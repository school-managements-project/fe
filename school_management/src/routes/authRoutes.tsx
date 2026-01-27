// import Register from '../pages/Auth/Register';
import LayoutAuth from '../layouts/LayoutAuth';
import AcceptInvite from '../pages/Auth/AcceptInvite';
import Login from '../pages/Auth/Login';

const authRoutes = [
    {
        path: '/auth',
        element: <LayoutAuth />,
        children: [
            // {
            //     index: true,
            //     Component: Register,
            // },
            // {
            //     path: 'register',
            //     Component: Register,
            // },
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'accept-invite',
                Component: AcceptInvite,
            },
        ],
    },
];
export default authRoutes;
