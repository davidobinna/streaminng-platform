import { createBrowserRouter, Navigate } from "react-router-dom";
import Default from "./Layouts/Default";
import Guest from "./Layouts/Guest";
import Home from "./Layouts/Home";
import Writers from "./views/Writers";
import Homepage from "./views/Homepage";
import Login from "./views/Login";
import Notfound from "./views/Notfound";
import Signup from "./views/Signup";
import Membership from "./views/Membership";
import Anouncement from "./views/Anouncement";
import Contact from "./views/Contact";
import Dashoard from "./Layouts/Dashboard";
import Users from "./views/Users";
import Usersform from "./views/Usersform";
import AdminIndex from "./views/dashboard/admin/Index";
import DefaultIndex from "./views/dashboard/default/Index";
import ForgotPassword from "./views/ForgotPassword";
import Billing from "./views/Billing";

const router = createBrowserRouter([
     {
        path: '/',
        element: <Home/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/home"/>
            },
            {
                path: '/home',
                element: <Homepage/>
            },
            {
                path: '/membership',
                element: <Membership/>
            },
            {
                path: '/anouncement',
                element: <Anouncement/>
            },
            {
                path: '/contact',
                element: <Contact/>
            },
            {
                path:'/billing/:id',
                element: <Billing/>
            }
        ],
     },
     {
        path: '/',
        element: <Guest/>,
        children: [
            {
                path: '/signup/new',
                element: <Signup/>
            },

            {
                path: '/signup/plan/:id',
                element: <Signup/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/forgot',
                element: <ForgotPassword/>
            },
        ],
     },
     {
        path: '/',
        element: <Default/>,
        children: [
            {
                path: '/explore',
                element: <Writers />
            },
        ]
     },
     {
        path:'/',
        element: <Dashoard/>,
        children: [
            {
                path: '/dashboard',
                element: <Navigate to="admin"/>
            },
            {
                path: '/dashboard/admin',
                element: <AdminIndex/>
            },
            {
                path: '/dashboard/default',
                element: <DefaultIndex/>
            },
            {
                path: '/dashboard/users',
                element: <Users/>
            },
            {
                path: '/dashboard/users/new',
                element: <Usersform key="create"/>
            },
            {
                path: '/dashboard/users/:id',
                element: <Usersform key="update"/>
            },
        ]
     },
     {

     },
     {
        path: "*",
        element: <Notfound/>
     }
])

export default router;
