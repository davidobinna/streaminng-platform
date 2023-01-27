import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";

const DefaultIndex = () => {
    const {defaultUser} = useStateContext()
  if (!defaultUser) {
        return <Navigate to="/home"/>
}

    return (
        <div>
            <h4>Default Index</h4>
        </div>
    )
}


export default DefaultIndex;
