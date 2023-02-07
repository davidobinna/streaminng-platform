import { createBrowserRouter, Navigate } from "react-router-dom";
import Default from "./Layouts/Default";
import Guest from "./Layouts/Guest";
import Home from "./Layouts/Home";
import Homepage from "./views/Homepage";
import Login from "./views/Login";
import Notfound from "./views/Notfound";
import Signup from "./views/Signup";
import Membership from "./views/Membership";
import Anouncement from "./views/Anouncement";
import Contact from "./views/Contact";
import Dashoard from "./Layouts/Dashboard";
import Users from "./views/dashboard/admin/users/Index";
import CreateUsers from "./views/dashboard/admin/users/Create";
import AdminIndex from "./views/dashboard/admin/index";
import DefaultIndex from "./views/dashboard/default/Index";
import ForgotPassword from "./views/ForgotPassword";
import Billing from "./views/Billing";
import Index from "./views/dashboard/Index";
import { Feed, VideoDetail, ChannelDetail, SearchFeed } from "./Layouts/components";
import Posts from "./views/dashboard/admin/post/Index";
import Tags from "./views/dashboard/admin/tag/Index";
import Writers from "./views/dashboard/admin/writers/Index";
import CreatePosts from "./views/dashboard/admin/post/Create";
import CreateWriters from "./views/dashboard/admin/writers/Create";

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
                path: '/feed',
                element: <Feed />
            },
            {
                path: '/video/:id',
                element: <VideoDetail />
            },
            {
                path: '/channel/:id',
                element: <ChannelDetail />
            },
            {
                path: '/search/:searchTerm',
                element: <SearchFeed />
            },
        ]
     },
     {
        path:'/',
        element: <Dashoard/>,
        children: [
            {
                path: '/dashboard',
                element: <Navigate to="index"/>
            },
            {
                path: '/dashboard/index',
                element: <Index/>
            },
            {
                path: '/',
                element: <AdminIndex/>,
                children: [
                    {
                        path: '/adminroutes',
                        element: <Navigate to="/dashboard/admin/users"/>
                    },
                    //Route for Users
                    {
                        path: '/dashboard/admin/users',
                        element: <Users/>
                    },
                    {
                        path: '/dashboard/admin/users/new',
                        element: <CreateUsers key="create"/>
                    },
                    {
                        path: '/dashboard/admin/users/:id',
                        element: <CreateUsers key="update"/>
                    },
                    //Route for Posts
                    {
                        path: '/dashboard/admin/posts',
                        element:  <Posts/>
                    },
                    {
                        path: '/dashboard/admin/posts/new',
                        element:  <CreatePosts key="create"/>
                    },
                    {
                        path: '/dashboard/admin/posts/:id',
                        element:  <CreatePosts key="update"/>
                    },
                    //Route for Tags
                    {
                        path: '/dashboard/admin/tags',
                        element:  <Tags/>
                    },
                    {
                        path: '/dashboard/admin/writers',
                        element: <Writers/>
                    },
                    {
                        path: '/dashboard/admin/writers/new',
                        element: <CreateWriters key="create"/>
                    },
                    {
                        path: '/dashboard/admin/writers/:id',
                        element: <CreateWriters key="update"/>
                    },
                ]
            },
            {
                path: '/',
                element: <DefaultIndex/>,
                children: [
                    {
                        path: '/defaultroutes',
                        element: <Navigate to="/dashboard/default/feed"/>
                    },
                    {
                        path: '/dashboard/default/feed',
                        element: <Feed />
                    },
                    {
                        path: '/dashboard/default/video/:id',
                        element: <VideoDetail />
                    },
                    {
                        path: '/dashboard/default/channel/:id',
                        element: <ChannelDetail />
                    },
                    {
                        path: '/dashboard/default/search/:searchTerm',
                        element: <SearchFeed />
                    },
                ]
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
