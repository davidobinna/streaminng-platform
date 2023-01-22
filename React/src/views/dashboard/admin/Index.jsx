import { Navigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";

const AdminIndex = () => {
    const {admin} = useStateContext()
  if (!admin) {
        return <Navigate to="/home"/>
}

    return (
        <div>
            <h4>ADMIN Index</h4>
        </div>
    )
}


export default AdminIndex;
