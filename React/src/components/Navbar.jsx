
import { Link } from "react-router-dom";
import "./NavbarStyles.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
   const [click, setClick ] = useState(false);
   const [color, setColor] = useState(false);

   const changeColor = () => {
    if (window.scrollY >= 100 ) {
       setColor(true)
    } else {
        setColor(false)
    }
   }
 window.addEventListener('scroll', changeColor)

   const handleClick = () => {
    setClick(!click)
   }

    return (
        <div className={color ? 'header header-bg' : 'header'}>
        <Link to='/'><h1>nas AIS</h1></Link>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li>
             <Link to='/'>Home</Link>
            </li>
            <li>
             <Link to='/membership'>Membership</Link>
            </li>
            <li>
             <Link to='/anouncement'>Announcement</Link>
            </li>
            <li>
             <Link to='/contact'>Support</Link>
            </li>
        </ul>
        <div className="hamburger" onClick={handleClick}>
           {click ? (<FaTimes size={15} style={{color: '#fff'}}/>) : (<FaBars size={15} style={{color: '#fff'}}/>) }
        </div>
        </div>
    );
}

export default Navbar;
