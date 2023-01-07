import { Outlet } from "react-router-dom";


function Guest() {
    return (
        <div>
            <div><Outlet/></div>
        </div>
    )
}


export default Guest;
