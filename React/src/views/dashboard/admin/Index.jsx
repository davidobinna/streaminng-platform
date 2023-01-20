import { Navigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";

const ADMIN = "4";

const AdminIndex = () => {
const{type} = useStateContext()
if (type !== ADMIN) {
   return <Navigate to="/dashboard/index"/>
}
    return (
        <div>
            <h4>ADMIN Index</h4>
        </div>
    )
}


export default AdminIndex;
