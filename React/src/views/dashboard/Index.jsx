import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";


const Index = () => {
const {admin,defaultUser} = useStateContext()
if (admin) {
    return <Navigate to="/dashboard/admin"/>
}
if (defaultUser) {
    return <Navigate to="/dashboard/default"/>
}

    return (
        <div>
            <h4>Loading....</h4>
        </div>
    )
}

export default Index;
