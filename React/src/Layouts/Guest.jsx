import { Outlet } from "react-router-dom";


function Guest() {
    return (
        <div>
            <h1>Guest Layout</h1>
            <div><Outlet/></div>
        </div>
    )
}


export default Guest;
