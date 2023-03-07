import { Box, Stack, Typography } from "@mui/material";
import { Loader, Sidebar, Videos } from "./";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";


var INCREATMENT = 0 ;

const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState("Latest");
    const [videos, setVideos] = useState(null);
    const {setNotification} = useStateContext()
    const [loading, setloading] = useState(false)
    const [morePages, setMorePages] = useState(true)
  /**  useEffect(() => {
        setVideos(null);

        fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
          .then((data) => setVideos(data.items))
        }, [selectedCategory]); **/

 useEffect(() => {
    setVideos(null)
    axiosClient.get('/feed')
    .then((res) => {
        console.log(res.data)
          setVideos(res.data.posts)
          setMorePages(res.data.morepages)
    }).catch((error)=>{
        setNotification(error)
    });
 },[selectedCategory])



 function multiply(){
    return INCREATMENT += 8
   }

   const loadMore = async (e) => {
    e.preventDefault()
    setloading(true)
    setNotification("Fetchig data, please wait...",2000)
    try {
        const res = await axiosClient.get(`/loadmore/${multiply()}`)
        setloading(false)
        console.log(res.data)
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
           admin={false} defaultuser={true} writer={false}/>
               <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
                Copyright © 2023 AIS .net
               </Typography>
           </Box>
           <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
              <Typography variant="h5" fontWeight="bold" mb={2} sx={{ color: "white" }}> {selectedCategory}
                 <span style={{ color: "#9c02e4" }}> Scene</span>
               </Typography>
               {loading ? (<Loader />):(<Videos videos={videos}/>)}
            {morePages && <button onClick={loadMore}>Load more</button>}
           </Box>
         </Stack>
    )
}

export default Feed;
//<Videos videos={videos}/>
