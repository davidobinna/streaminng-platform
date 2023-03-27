import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Videos, Loader } from "./";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { deepPurple } from '@mui/material/colors';
import Core from "./comments/Core";

var INCREATMENT = 0 ;
var MODELNAME = 'posts';


const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setloading] = useState(false)
  const {user,setUser,setNotification, token} = useStateContext()
  const [morePages, setMorePages] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(null)
  const [allowComment, setAllowComment] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams();

  /**useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  }, [id]);  **/

useEffect(() => {
     axiosClient.get('/user')
      .then((res) => {
       setUser(res.data)
      })
      .catch((error) => {
          console.log(error)
      });
},[])

useEffect(() => {
    axiosClient.get(`/feed/${id}`)
    .then((res) => {
        setNotification(
            "Fetchig data, please wait...",
            2000)
        setVideoDetail(res.data)
        setIsSubscribed(res.data.plan.subscribed)
        setAllowComment(res.data.is_commnetable)
    })
    .catch((error) => {
        setNotification(error)
          if(!token){
           navigate('/login')
       }
    })
},[])


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
    try {
        const res = await axiosClient.get(`/loadmore/${multiply()}`)
        setloading(false)
         setVideos(res.data.posts)
         setMorePages(res.data.morepages)
    } catch (error) {
        setNotification(error)
    }
   }

   const subscribed = (type) => {
       if(type === "premium" && isSubscribed != true ){
         return true
       } else {
        return false
       }
   }

  if(!videoDetail) return <Loader />;

//  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeightb="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
               {!subscribed(videoDetail.type.toString()) ? (<ReactPlayer url={`https://www.youtube.com/watch?v=${5}`} className="react-player" controls />):(
               <h2
                style={{
                width: "100%",
                height: "100%",
                borderRadius: "5px",
                color: "grey",
                backgroundColor: "black",
                padding: "1rem",
                border: "2px solid purple",
              }}>Oop! This scene is only available for premium users only, please subscribe to get access</h2>) }
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              { videoDetail.title }
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
              <span style={{ fontSize: "15px", color: "#fff", ml: "5px" }}>{videoDetail.published_at}</span>
                </Typography>
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
              <Link to={`/channel`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }} gap={2} sx={{ fontSize: "15px", display: 'flex', alignItems: "center" }}  color="#fff" >
                {!user.id ? (<Avatar sx={{ width:45, height:45, bgcolor: deepPurple[500] }}>MV</Avatar>):(<Avatar alt="profile" src={videoDetail?.author_image || ""  } sx={{width:45, height:45}} />) }
                      { videoDetail.author_name } : {videoDetail.type.toString() + ' plan'} {videoDetail.type.toString() === "premium" && <CheckCircleIcon sx={{ fontSize: "15px", color: "#9c02e4", ml: "5px" }} /> }
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
              }} > {videoDetail?.body_content || null} Load moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad more
              Load moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad more
              Load moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad more
              Load moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad more
              Load moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad more
              Load moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad moreLoad more </p>
                </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
            <Typography variant={{ sm: "subtitle1", md: 'h6' }} gap={2} sx={{ fontSize: "15px", display: 'flex', alignItems: "center", mt: "20px" }} color="#fff" >
             <span style={{
            borderRadius: "9px",
            padding: "12px 20px",
            fontSize: "1.2rem",
            background: "#9c02e4",
            color:"#fff",
            border: "1px solid rgba(150, 5, 194, 0.922)",
            cursor: "pointer",
             }}>Comments </span>
            </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#000", pb:"5rem" }} py={1} px={2}>
            <Core />
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



//<CommentList comments={comments} />
//<AddComments value={allowComment} id={id} model_name={MODELNAME}/>

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
