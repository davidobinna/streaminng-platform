import { Navigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";

const DEFAULT = "1";

const DefaultIndex = () => {
const{type} = useStateContext()
if (type !== DEFAULT) {
   return <Navigate to="/dashboard/index"/>
}
    return (
        <div>
            <h4>Default Index</h4>
        </div>
    )
}


export default DefaultIndex;
