import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { categories, admincategories, writercategories } from "../utils/constants";

const Sidebar = ({ selectedCategory, setSelectedCategory, admin, defaultuser, writer }) => {
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
      )) }

{admin &&
      admincategories.map((category) => (
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
    </Stack>
 )
}
export default Sidebar;
