import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { Navbar } from "./components";
import { Box } from "@mui/material";

function Dashoard() {
const {user, token, setUser, setToken, setDefaultUser, setAdmin, setNotification} = useStateContext();
if (!token) {
    return <Navigate to='/login'/>
}

useEffect(()=> {
     getUser();
},[])

const onLogout= async () => {
     try {
          const res = await axiosClient.post('/logout')
          if (res.data.success) {
             setToken(null);
             setAdmin(null)
             setDefaultUser(null)
             setUser({});
             setNotification('You\'re Logged out!');
          }
     } catch (error) {
        setNotification(error);
     }
}

const getUser = async () => {
   try {
         const res = await axiosClient.get('/user')
           setUser(res.data)
   } catch (error) {
    setNotification(error);
    setToken(null);
             setUser({});
   }
}

    return (
        <Box sx={{ backgroundColor: '#000' }}>
       <Navbar/>
          <Outlet/>
      </Box>
    )
}


export default Dashoard;
