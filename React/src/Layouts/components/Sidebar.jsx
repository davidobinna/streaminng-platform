import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LogoutIcon from '@mui/icons-material/Logout';

import { categories, admincategories, writercategories } from "../utils/constants";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { useEffect, useState } from "react";


const Sidebar = ({ selectedCategory, setSelectedCategory, admin, defaultuser, writer, setRouteSlug }) => {

const {user,setNotification,setUser,setAdmin,setDefaultUser,setToken} = useStateContext();

const [backgroundColor, setBackgroundColor] = useState("#9c02e4");
const [tags,setTags] = useState([])


useEffect(()=>{
     axiosClient.get('/alltags')
        .then((res) =>{
            setTags(res.data.data)
        })
        .catch((error)  => {
            console.log(error)
        })
        let timer = null
        timer = setTimeout(() => {
            setBackgroundColor("#000")
        }, 3000);
        return () => clearTimeout(timer);
},[])

const onLogout= async (e) => {
    e.preventDefault();
    try {
         const res = await axiosClient.post('/logout')
         if (res.data.success) {
            setToken(null);
            setAdmin(null)
            setDefaultUser(null)
            setUser({});
            setNotification('You\'re Logged out!');
         }
    } catch (error) {
       setNotification(error);
    }
}


const handleRefreshClick = () => {
    window.location.reload();
  };


return (
    <Stack direction="row"
    sx={{
      overflowY: "auto",
      height: { sx: "auto", md: "95%" },
      flexDirection: { md: "column" },
    }}>

     {!admin &&
     <Link
     to='/home'>
     <button
       className="category-btn"
        style={{
            width: "100%",
          color: "white",
        }}>
            <span style={{ color: "white", marginRight: "15px" }}>
          <HomeIcon />
            </span>
            <span style={{ opacity: "1" }} >
                Home
            </span>
        </button>
        </Link>}

    {defaultuser &&
      categories.map((category) => (
        <button
        className="category-btn"
        onClick={handleRefreshClick}
        style={{
          background: category.name === selectedCategory &&  backgroundColor,
          color: "white",
        }} key={category.name}>
            <span style={{ color: category.name === selectedCategory ? "white" : "#9c02e4", marginRight: "15px"}}>
                {category.icon}
            </span>
            <span style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }} >
                {category.name}
            </span>
        </button>
      )) }


   {admin &&
      admincategories.map((category) => (
        <Link
         key={category.name} to={category.link}>
        <button         className="category-btn"
        onClick={() => setSelectedCategory(category.link)}
        style={{
            width: "100%",
          background: category.name === selectedCategory && "#9c02e4",
          color: "white",
        }} key={category.name}>
            <span style={{ color: category.name === selectedCategory ? "white" : "#9c02e4", marginRight: "15px" }}>
                {category.icon}
            </span>
            <span style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }} >
                {category.name}
            </span>
        </button>
        </Link>
      )) }

     {tags.length !== 0 & admin !== true && Object.keys(tags).map(item => (
               <button
               onClick = {(e) => setRouteSlug(tags[item].name.toLowerCase())}
                 key={tags[item].id.toString()}
                   className="category-btn"
                       style={{
                        color: "white",
                         }}>
                       <span style={{ color: "white", marginRight: "15px" }}>
                       <LocalOfferIcon />
                       </span>
                        <span style={{ opacity: "1" }} >
                         {tags[item].name}
                       </span>
                    </button>
        ))}

{writer &&
      writercategories.map((category) => (
        <Link key={category.name} to={category.link}>
        <button         className="category-btn"
        onClick={() => setSelectedCategory(category.link)}
        style={{
          background: category.name === selectedCategory && "#FC1503",
          color: "white",
        }} key={category.name}>
            <span style={{ color: category.name === selectedCategory ? "white" : "red", marginRight: "15px" }}>
                {category.icon}
            </span>
            <span style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }} >
                {category.name}
            </span>
        </button>
        </Link>

      )) }


        {user.id &&
      <button onClick={onLogout} className="category-btn"
        style={{
          background: "#9c02e4",
          color: "white",
        }}>
            <span style={{ color: "white", marginRight: "15px" }}>
            <LogoutIcon />
            </span>
            <span style={{ opacity: "1" }} >
                Logout
            </span>
        </button>}
    </Stack>
 )
}
export default Sidebar;
