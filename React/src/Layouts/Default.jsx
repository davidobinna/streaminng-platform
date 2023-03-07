import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Navbar } from "./components";

function Default() {
    const {notification} = useStateContext()

    return (
        <Box sx={{ backgroundColor: '#000' }}>
        <Navbar/>
        <div>
         {notification &&
          <div className="notification" >
          {notification}
          </div>
        }
        </div>
        <Outlet/>
        </Box>
    )
}


export default Default;
