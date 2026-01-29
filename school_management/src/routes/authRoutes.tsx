// import Register from '../pages/Auth/Register';
import LayoutAuth from '../layouts/LayoutAuth';
import AcceptInvite from '../pages/Auth/AcceptInvite';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Login from '../pages/Auth/Login';
import Profile from '../pages/Auth/Profile/Profile';
import ResetPassword from '../pages/Auth/ResetPassword';

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

            {
                path: 'forgot-password',
                Component: ForgotPassword,
            },
            {
                path: 'reset-password',
                Component: ResetPassword,
            },
            {
                path: 'profile',
                Component: Profile,
            },
        ],
    },
];
export default authRoutes;
