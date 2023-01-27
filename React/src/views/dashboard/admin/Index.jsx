import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";

const AdminIndex = () => {
    const {admin} = useStateContext()
  if (!admin) {
        return <Navigate to="/home"/>
}

useEffect(()=> {
    getUsers()
});

const getUsers = async () => {
    try {
         const res = axiosClient.get('/users')
         console.log(res.data)
    } catch (error) {
       console.log(error)
    }
}

    return (
        <div>
            <h4>ADMIN Index</h4>
        </div>
    )
}


export default AdminIndex;
