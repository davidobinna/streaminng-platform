import { useCallback, useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Dashoard() {
const {user, token, setUser, setToken, type, notification, setNotification} = useStateContext();
if (!token) {
    return <Navigate to='/login'/>   
} else {
    checkRoles()
}
function checkRoles() {
 switch (type) {
    case 1:
        return <Navigate to='/dashboard/default'/>
    case 2:
        return <Navigate to='/dashboard/moderator'/>
    case 3:
        return <Navigate to='/dashboard/writer'/>
    case 4:
        return <Navigate to='/dashboard/admin'/>
    case 4:
        return <Navigate to='/dashboard/superadmin'/>
    default:
        return <Navigate to='/home'/>
  }
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
    setToken(null);
             setUser({});
   }
}

    return (
        <div>
    <h1>Dashoard Layout</h1>
      <div className="content">
        <header>
          <div>
            <p><Link to="/home">Home</Link></p>
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
