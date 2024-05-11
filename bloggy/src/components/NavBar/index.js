import React, { useState, useRef, useEffect } from "react";
import { Nav, NavLink, NavMenu, SideDrawer, Overlay, Bars} from "./NavBarElements";
import './index.css';
import { setLoggedInUser, getLoggedInUser, clearLoggedInUser } from '../../pages/login.js';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); /* State to track sidebar visibility */
    const [isActive, setIsActive] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen); /* Toggle sidebar */
        setIsActive(!isActive); // Toggle the active state
    };
   
    return (
        <>
            <Nav className="Nav">
                <div class={`hamburger ${isActive ? 'is-active' : ''}`} id="hamburger-1" onClick={toggleSidebar}>
                    <span class="line"></span>
                    <span class="line"></span>
                    <span class="line"></span>
                </div>
                <NavMenu className='NavMenu'>
                    <NavLink className='NavLink' href="#" to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink className='NavLink' href="#" to="/about" activeStyle>
                        About
                    </NavLink> 
                    <NavLink className='NavLink' href="#" to="/blog" activeStyle>
                        Blog
                    </NavLink>
                    <NavLink className='NavLink' href="#" to="/project" activeStyle>
                        Project
                    </NavLink>
                    <NavLink className='NavLink' href="#" to="/login" activeStyle>
                        {getLoggedInUser() == null ? "Log In" : "Profile"}
                    </NavLink>
                </NavMenu>
                <SideDrawer isOpen={isOpen}>
                    <NavLink className='NavLink'to="/" onClick={toggleSidebar}>Home</NavLink>
                    <NavLink className='NavLink'to="/about" onClick={toggleSidebar}>About</NavLink>
                    <NavLink className='NavLink'to="/blog" onClick={toggleSidebar}>Blog</NavLink>
                    <NavLink className='NavLink'to="/project" onClick={toggleSidebar}>Project</NavLink>
                    <NavLink className='NavLink'to="/login" onClick={toggleSidebar}>{getLoggedInUser() == null ? "Log In" : "Profile"}</NavLink>
                </SideDrawer>
                <Overlay isOpen={isOpen} onClick={toggleSidebar} /> 
            </Nav>
        </>
    );
};
 
export default Navbar;