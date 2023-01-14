import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Dashoard() {
const {user, token, setUser, setToken, notification, setNotification} = useStateContext();
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
   }
}

    return (
        <div>
    <h1>Dashoard Layout</h1>
      <div className="content">
        <header>
          <div>
           <p>UserName: {user && user.name} &nbsp; &nbsp; </p>
            <br />
           <p><a onClick={onLogout} className="btn-logout" href="#">Logout</a></p>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div className="notification" >
          {notification}
          </div>
        }
      </div>
    </div>
    )
}


export default Dashoard;
