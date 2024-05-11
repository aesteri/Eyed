import logo from './logo.svg';
import './App.css';
import React from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/index";
import About from "./pages/about";
import Blog from "./pages/blog";
import Project from "./pages/project";
import Login from './pages/login';
import PostPage from './pages/blogposts/postpage';


function App() {
  return (
    <div className='wholethang'>
      <Router>
          <Navbar className="slay"/>
          <div className='main'>
            <Routes>
                <Route exact={true} path="" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/project" element={<Project />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blog/post/:postId" element={<PostPage />} />
            </Routes>
          </div>
          <Footer />
      </Router>
    </div>
  );
}

export default App;
