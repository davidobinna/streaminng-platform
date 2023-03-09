import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Videos, Loader } from "./";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { deepPurple } from '@mui/material/colors';

var INCREATMENT = 0 ;

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setloading] = useState(false)
  const {user,setNotification} = useStateContext()
  const [morePages, setMorePages] = useState(true)
  const { id } = useParams();

  /**useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  }, [id]);  **/

useEffect(() => {
    axiosClient.get(`/feed/${id}`)
    .then((res) => {
        setNotification(
            "Fetchig data, please wait...",
            2000)
        console.log(res.data)
        setVideoDetail(res.data)
    })
    .catch((error) => {
        setNotification(error)
    })
},[id])


useEffect(() => {
    setVideos(null)
    axiosClient.get('/feed')
    .then((res) => {
          setVideos(res.data.posts)
          setMorePages(res.data.morepages)
    }).catch((error)=>{
        setNotification(error)
    });
 },[])

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

  if(!videoDetail) return <Loader />;

//  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeightb="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${5}`} className="react-player" controls />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              { videoDetail.title }
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
              <span style={{ fontSize: "15px", color: "#fff", ml: "5px" }}>{videoDetail.published_at}</span>
                </Typography>
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
              <Link to={`/channel`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }} gap={2} sx={{ fontSize: "15px", display: 'flex', alignItems: "center" }}  color="#fff" >
                {!user.id ? (<Avatar sx={{ width:45, height:45, bgcolor: deepPurple[500] }}>MV</Avatar>):(<Avatar alt="profile" src={videoDetail?.author_name || ""  } sx={{width:45, height:45}} />) }
                      { videoDetail.author_name } : creator
                  <CheckCircleIcon sx={{ fontSize: "15px", color: "#9c02e4", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt('400').toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt('400').toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
            <Typography variant={{ sm: "subtitle1", md: 'h6' }} gap={2} sx={{ fontSize: "15px", display: 'flex', alignItems: "center" }}  color="#fff" >
                     Tags : { videoDetail.tag_name.length != 0 ? (videoDetail.tag_name.map(item => 
                        <button style={{ ml: "2px" }} disabled key={item.toString()}>{item}</button>
                        )):('No Tags')  }
                </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
            <Typography variant={{ sm: "subtitle1", md: 'h6' }} gap={2} sx={{ fontSize: "15px", display: 'flex', alignItems: "center" }} color="#fff" >
                     <p            
                style={{
                width: "100%",
                height: "100%",
                borderRadius: "5px",
                color: "white",
                backgroundColor: "black",
                padding: "1rem",
                border: "2px solid purple",
              }} > {videoDetail?.body_content || null} Load moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad more
              Load moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad more
              Load moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad more
              Load moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad more
              Load moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad more
              Load moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad more </p>
                </Typography>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          {loading ? (<Loader />):(<Videos videos={videos} direction="column" />)}
          {morePages && <button onClick={loadMore}>Load more</button>}
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;




/*  return (
    <Box minHeightb="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
}; */