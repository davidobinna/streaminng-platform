import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import { categories, admincategories, writercategories } from "../utils/constants";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";

const Sidebar = ({ selectedCategory, setSelectedCategory, admin, defaultuser, writer }) => {

const {user,setNotification,setUser,setAdmin,setDefaultUser,setToken} = useStateContext();

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

return (
    <Stack direction="row"
    sx={{
      overflowY: "auto",
      height: { sx: "auto", md: "95%" },
      flexDirection: { md: "column" },
    }}>
        {defaultuser &&
      categories.map((category) => (
        <button         className="category-btn"
        onClick={() => setSelectedCategory(category.name)}
        style={{
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
      )) }

{admin &&
      admincategories.map((category) => (
        <Link
         key={category.name} to={category.link}>
        <button         className="category-btn"
        onClick={() => setSelectedCategory(category.link)}
        style={{
            width: "10rem",
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
            <FitnessCenterIcon />
            </span>
            <span style={{ opacity: "1" }} >
                Logout
            </span>
        </button>}
    </Stack>
 )
}
export default Sidebar;
