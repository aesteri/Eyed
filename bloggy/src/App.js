import logo from './logo.svg';
import './App.css';
import React from "react";
import Navbar from "./components/NavBar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Blog from "./pages/blog";
import Project from "./pages/project";


function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
                path="/project"
                element={<Project />}
            />
            <Route path="/blog" element={<Blog />} />
        </Routes>
    </Router>
  );
}

export default App;
