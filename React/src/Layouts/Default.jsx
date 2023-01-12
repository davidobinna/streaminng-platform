import { Outlet } from "react-router-dom";

function Default() {
    return (
        <div>
            <h1>Default Layout</h1>
            <div><Outlet/></div>
        </div>
    )
}


export default Default;
