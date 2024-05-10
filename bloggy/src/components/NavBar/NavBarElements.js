import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: whitesmoke;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem calc((100vw - 1000px) / 2); /* Centers content */
  z-index: 12;


  @media (max-width: 768px) {
    padding: 0.2rem; /* Adjust padding for smaller screens */
  }
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 1rem; /* Consistent padding */
  height: 100%;
  cursor: pointer;
  text-decoration: none; /* Remove underline */
  color: black;

  &.active {
    color: gray; /* Style for active link */
  }
`;

export const Bars = styled(FaBars)`
  font-size: 1.5rem;
  display: none;

  @media (max-width: 768px) {
    display: block; /* Show hamburger menu on mobile */

  }
`;

export const SideDrawer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-300px')}; /* Slide in/out */
  width: 250px; /* Slightly wider sidebar */
  height: 100%;
  background: white;
  color: black;
  transition: right 0.3s; /* Smooth transition */
  z-index: 10;
  padding: 20px;
  display: none; /* Hidden by default */

  @media (max-width: 768px) {
    display: block; /* Show sidebar on mobile */
    display: flex; /* Flexbox for layout */
    flex-direction: column; /* Vertical stacking */
    align-items: flex-start;
    outline: none; /* Remove the blue outline */
    -webkit-tap-highlight-color: transparent;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 5;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')}; /* Toggle based on sidebar state */
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none; /* Hide on mobile */
  }
`;
