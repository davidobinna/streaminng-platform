import { useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function Guest() {
    let {id}  = useParams()
    const [routeId,setrouteId] = useState(id)
    const {token} = useStateContext();
    if (token) {
        if (routeId) {
            return <Navigate to="/membership"/>
        }
        return <Navigate to="/dashboard"/>
    }

    return (
        <div>
            <div><Outlet/></div>
        </div>
    )
}


export default Guest;
