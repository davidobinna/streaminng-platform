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
            }
        ],
     },
     {
        path: '/',
        element: <Guest/>,
        children: [
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/login',
                element: <Login/>
            }
        ],
     },
     {
        path: '/',
        element: <Default/>,
        children: [
            {
                path: '/explore',
                element: <Navigate to="/writers"/>
            },
            {
                path: '/writers',
                element: <Writers/>
            }
        ]
     },
     {
        path: "*",
        element: <Notfound/>
     }
])

export default router;
