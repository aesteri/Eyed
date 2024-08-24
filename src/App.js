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
import { Helmet } from 'react-helmet'
import Project from "./pages/project";
import Login from './pages/login';
import PostPage from './pages/blogposts/postpage';
import BucketList from './pages/bucketlist';

function App() {
  return (
    <div className='wholethang'>
      <Router>
          <Navbar className="slay"/>
          <div className='mmain'>
            <Routes>
                <Route exact={true} path="" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/project" element={<Project />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blog/post/:postId" element={<PostPage />} />
                <Route path="/bucketlist" element={<BucketList />} />
            </Routes>
          </div>
          <Footer />
      </Router>
    </div>
  );
}

export default App;
