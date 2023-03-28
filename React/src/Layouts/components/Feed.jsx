import { Box, Stack, Typography } from "@mui/material";
import { Loader, Sidebar, Videos } from "./";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";


var INCREATMENT = 0 ;
var INCREATMENTSLUG = 0 ;

const Feed = () => {
    const [routeSlug, setRouteSlug] = useState('')
    const [selectedCategory, setSelectedCategory] = useState("Latest");
    const [videos, setVideos] = useState(null);
    const {setNotification} = useStateContext()
    const [loading, setloading] = useState(false)
    const [morePages, setMorePages] = useState(true)

 useEffect(() => {
    setVideos(null)
    setloading(true)
    if (!routeSlug) {
        axiosClient.get('/feed')
        .then((res) => {
            setloading(false)
            setRouteSlug('')
              setVideos(res.data.posts)
              setMorePages(res.data.morepages)
        }).catch((error)=>{
            setNotification(error)
        });
    } else {
        axiosClient.get(`tagspost/${routeSlug}` )
        .then((res) => {
         setloading(false)
         setVideos(res.data.posts)
         setMorePages(res.data.morepages)
        }) .catch((error) => {
          setNotification(error)
        })
    }

 },[selectedCategory,routeSlug])



 function multiply(){
    return INCREATMENT += 8
   }

 function multiplyslug(){
    return INCREATMENTSLUG += 8
 }

   const loadMore = async (e) => {
    e.preventDefault()
    setloading(true)
    setNotification("Fetchig data, please wait...",2000)
    try {
        const res = await axiosClient.get(!routeSlug ?
                                       `/loadmore/${multiply()}`
                                       : `/loadmoretagpost/${multiplyslug()}/${routeSlug}` )
        setloading(false)
           setVideos(res.data.posts)
          setMorePages(res.data.morepages)
    } catch (error) {
        setNotification(error)
    }
   }

    return (
         <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
           <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
           <Sidebar selectedCategory={selectedCategory}
           setSelectedCategory={setSelectedCategory}
           setRouteSlug={setRouteSlug}
           admin={false} defaultuser={true} writer={false}/>
               <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
                Copyright © 2023 AIS .net
               </Typography>
           </Box>
           <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
              <Typography variant="h5" fontWeight="bold" mb={2} sx={{ color: "white" }}> {selectedCategory === "Home" ? ("Latest"):(routeSlug === ''? selectedCategory : routeSlug ) }
                 <span style={{ color: "#9c02e4" }}> Assets</span>
               </Typography>
               {loading ? (<Loader />):(<Videos videos={videos}/>)}
            {morePages && <button onClick={loadMore}>more..</button>}
           </Box>
         </Stack>
    )
}

export default Feed;
//<Videos videos={videos}/>
