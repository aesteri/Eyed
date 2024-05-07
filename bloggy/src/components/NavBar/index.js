import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements";
import './index.css';
const Navbar = () => {
    return (
        <>
            <Nav className="Nav">
                <NavMenu className='NavMenu'>
                    <NavLink className='NavLink' href="#" to="/index" activeStyle>
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
                        Log In
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;