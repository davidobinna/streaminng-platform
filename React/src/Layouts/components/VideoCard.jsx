import React from 'react'
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle , serverAddress } from "../utils/constants";
import { useStateContext } from '../../contexts/ContextProvider';
import { deepPurple } from '@mui/material/colors';



const getUser = () => {
    const {user} = useStateContext()
    return user
}


const VideoCard = (scene) => (
  <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0 }}>
    <Link to={scene ? `/feed/${scene.value.id}` : `/home` }>
      <CardMedia image={ `${serverAddress}/storage/`+scene?.value.image.substring(7) || demoThumbnailUrl } alt={scene.title}
        sx={{ width: { xs: '100%', sm: '358px'}, height: 150 }}
      />
    </Link>
    <CardContent sx={{ backgroundColor: "#1E1E1E", height: '88px' }}>
      <Link to={scene ? `/feed/${scene.value.id}` : `/home` } >
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF" gap={2} style={{ fontSize: "12px", display: 'flex', alignItems: "center"}}>
        {!getUser().id ? (<Avatar sx={{ width:45, height:45, bgcolor: deepPurple[500] }}>MV</Avatar>):(<Avatar alt="profile" src="" sx={{width:45, height:45}} />) }
          {scene?.value.title.slice(0, 30) || demoVideoTitle.slice(0, 60)} 3D Imagination to Meta Verse
        </Typography>
      </Link>
      <Link to={scene?.value.author_id ? `/writers/${scene?.value.author_id}` : demoChannelUrl} >
        <Typography  variant="subtitle2" color="gray" sx={{ fontSize: "12px", color: "grey", mt: "6px", display: 'flex', alignItems: "center"}} >
         {scene?.value.author_name.slice(0, 6) || demoChannelTitle}: {scene.value.type.toString() + " user"} {scene.value.type.toString() === "premium" && <CheckCircleIcon sx={{ fontSize: "12px", color: "#9c02e4", ml: "5px" }} />}
          <p style={{ marginLeft: "48px", color: "grey" }}> {scene?.value.published_at} </p>
        </Typography>
      </Link>
    </CardContent>
  </Card>
);

export default VideoCard





/*   <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0 }}>
    <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY` }>
      <CardMedia image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title}
        sx={{ width: { xs: '100%', sm: '358px'}, height: 170 }}
      />
    </Link>
    <CardContent sx={{ backgroundColor: "#1E1E1E", height: '106px' }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl } >
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF" gap={2} style={{ fontSize: "12px", display: 'flex', alignItems: "center"}}>
        {!getUser.id ? (<Avatar sx={{ width:50, height:50, bgcolor: deepPurple[500] }}>MV</Avatar>):(<Avatar alt="profile" src={images} sx={{width:50, height:50}} />) }
          {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
        </Typography>
      </Link>
      <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
        <Typography variant="subtitle2" color="gray" sx={{ fontSize: "12px", color: "grey", mt: "6px", display: 'flex', alignItems: "center"}} >
          {snippet?.channelTitle || demoChannelTitle}
          <CheckCircleIcon sx={{ fontSize: "12px", color: "#9c02e4", ml: "5px" }} />
          <p style={{ marginLeft: "40px", color: "grey" }}> published: 01-20-2022 </p>
        </Typography>
      </Link>
    </CardContent>
  </Card> */
