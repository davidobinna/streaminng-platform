import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";

const DefaultIndex = () => {
    const {defaultUser} = useStateContext()
  if (!defaultUser) {
        return <Navigate to="/home"/>
}

    return (
        <div>
            <Outlet/>
        </div>
    )
}


export default DefaultIndex;
