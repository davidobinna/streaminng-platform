import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Sidebar } from "../../../Layouts/components";


const AdminIndex = () => {
    const [selectedCategory, setSelectedCategory] = useState("Profile");
    const {admin, notification} = useStateContext()
  if (!admin) {
        return <Navigate to="/home"/>
}

    return (
        <div>
         {notification &&
          <div className="notification" >
          {notification}
          </div>
        }
            <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
           <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
           <Sidebar selectedCategory={selectedCategory}
           setSelectedCategory={setSelectedCategory}
           admin={true} default={false} writer={false}/>
               <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
                Copyright © 2023 AIS .net
               </Typography>
           </Box>
           <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
              <Typography variant="h5" fontWeight="bold" mb={2} sx={{ color: "white" }}> Admin
                 <span style={{ color: "#9c02e4" }}> {selectedCategory} </span>
               </Typography>
               <Outlet/>
           </Box>
         </Stack>
        </div>
    )
}


export default AdminIndex;
