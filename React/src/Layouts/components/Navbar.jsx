import { Avatar, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import  images  from '../../assets/HeroImage.jpeg';
import { logo } from '../utils/constants';
import { SearchBar } from './';
import { deepPurple } from '@mui/material/colors';
import { useStateContext } from '../../contexts/ContextProvider';


const Navbar = () => {
 const {user}  = useStateContext();

return (
    <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{ position:  "sticky", top: 0, background: '#000', justifyContent: "space-between" }}>
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
    {!user.id ? (<Avatar sx={{ width:50, height:50, bgcolor: deepPurple[500] }}>MV</Avatar>):(<Avatar alt="profile" src={images} sx={{width:50, height:50}} />) }
    </Link>
    <SearchBar />
    </Stack>
 );
}

export default Navbar;
