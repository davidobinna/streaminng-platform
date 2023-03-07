import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { Navbar } from "./components";
import { Box } from "@mui/material";

function Dashoard() {
const {user, token, setUser, setNotification} = useStateContext();
if (!token) {
    return <Navigate to='/login'/>
}

useEffect(()=> {
     getUser();
},[])


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
          <Navbar />
          <Outlet/>
      </Box>
    )
}


export default Dashoard;
