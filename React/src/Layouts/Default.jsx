import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Navbar } from "./components";

function Default() {

    return (
        <Box sx={{ backgroundColor: '#000' }}>
        <Navbar/>
        <Outlet/>
        </Box>
    )
}


export default Default;
