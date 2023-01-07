import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function Dashoard() {
const {token} = useStateContext();
if (!token) {
   return <Navigate to="/login"/>
}

    return (
        <div>
            <h1>Dashoard Layout</h1>
            <div><Outlet/></div>
        </div>
    )
}


export default Dashoard;
