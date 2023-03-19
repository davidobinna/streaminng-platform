import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SchoolIcon from '@mui/icons-material/School';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';

export const logo = 'https://i.ibb.co/s9Qys2j/logo.png';

export const categories = [
  { name: 'Latest', icon: <HomeIcon />, },
  { name: 'JS Mastery', icon: <CodeIcon />, },
  { name: 'Coding', icon: <CodeIcon />, },
  { name: 'ReactJS', icon: <CodeIcon />, },
  { name: 'NextJS', icon: <CodeIcon />, },
  { name: 'Music', icon: <MusicNoteIcon /> },
  { name: 'Education', icon: <SchoolIcon />, },
  { name: 'Podcast', icon: <GraphicEqIcon />, },
  { name: 'Movie', icon: <OndemandVideoIcon />, },
  { name: 'Gaming', icon: <SportsEsportsIcon />, },
  { name: 'Live', icon: <LiveTvIcon />, },
  { name: 'Sport', icon: <FitnessCenterIcon />, },
  { name: 'Fashion', icon: <CheckroomIcon />, },
  { name: 'Beauty', icon: <FaceRetouchingNaturalIcon />, },
  { name: 'Comedy', icon: <TheaterComedyIcon />, },
  { name: 'Gym', icon: <FitnessCenterIcon />, },
  { name: 'Crypto', icon: <DeveloperModeIcon />, },
];

export const admincategories = [
    { name: 'Latest', link:'/feed', icon: <HomeIcon />, },
    { name: 'Profile',link:'/', icon: <MusicNoteIcon /> },
    { name: 'Users', link:'/dashboard/admin/users', icon: <SchoolIcon />, },
    { name: 'Create User', link:'/dashboard/admin/users/new',  icon: <GraphicEqIcon />, },
    { name: 'Posts', link:'/dashboard/admin/posts', icon: <OndemandVideoIcon />, },
    { name: 'Create Post', link:'/dashboard/admin/posts/new', icon: <SportsEsportsIcon />, },
    { name: 'Writers', link:'/dashboard/admin/writers', icon: <LiveTvIcon />, },
    { name: 'Tags', link:'/dashboard/admin/tags', icon: <CheckroomIcon />, },
    { name: 'Create Tag', link:'/dashboard/admin/tags/new', icon: <FaceRetouchingNaturalIcon />, },
  ];

  export const writercategories = [
    { name: 'Latest', icon: <HomeIcon />, },
    { name: 'Podcast', icon: <GraphicEqIcon />, },
    { name: 'Movie', icon: <OndemandVideoIcon />, },
    { name: 'Gaming', icon: <SportsEsportsIcon />, },
    { name: 'Live', icon: <LiveTvIcon />, },
    { name: 'Sport', icon: <FitnessCenterIcon />, },
    { name: 'Fashion', icon: <CheckroomIcon />, },
    { name: 'Beauty', icon: <FaceRetouchingNaturalIcon />, },
    { name: 'Comedy', icon: <TheaterComedyIcon />, },
    { name: 'Gym', icon: <FitnessCenterIcon />, },
    { name: 'Crypto', icon: <DeveloperModeIcon />, },
  ];


export const serverAddress   = 'http://localhost:8000' ;
export const demoThumbnailUrl = 'https://i.ibb.co/G2L2Gwp/API-Course.png';
export const demoChannelUrl = '/channel/UCmXmlB4-HJytD7wek0Uo97A';
export const demoVideoUrl = '/video/GDa8kZLNhJ4';
export const demoChannelTitle = 'JavaScript Mastery';
export const demoVideoTitle = 'Build and Deploy 5 JavaScript & React API Projects in 10 Hours - Full Course | RapidAPI';
export const demoProfilePicture = 'http://dergipark.org.tr/assets/app/images/buddy_sample.png'
