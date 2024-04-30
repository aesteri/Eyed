import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/blog" activeStyle>
                        Blog
                    </NavLink>
                    <NavLink to="/project" activeStyle>
                        Project
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;