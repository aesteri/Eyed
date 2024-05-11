import React, { useState } from "react";
import { posts, projects } from "./login.js"
import './css/index.css';
import { Helmet } from 'react-helmet'
 
const Home = () => {
    const project1 = projects[projects.length - 2];
    const post1 = posts[posts.length - 1];
    const [currentImageIndices, setCurrentImageIndices] = useState(
        Array(posts.length).fill(0) // Initialize indices with 0 for each post
      );
    const [ccurrentImageIndices, ssetCurrentImageIndices] = useState(
        Array(projects.length).fill(0) // Initialize indices with 0 for each post
    );
    const handleNext = (postIndex) => {
        setCurrentImageIndices((prevIndices) => {
            const newIndices = [...prevIndices]; // Create a copy of the current indices

            let currentIndex = newIndices[postIndex];
            const totalImages = post1.picture.length;
            let nextIndex = (currentIndex + 1) % totalImages;
        
            // Keep incrementing until a valid image is found or we've looped once
            let iterations = 0;
            while (
              !post1.picture[nextIndex] &&
              iterations < totalImages
            ) {
              nextIndex = (nextIndex + 1) % totalImages;
              iterations++;
            }
        
            // If iterations equals totalImages, it means all images are null, so we reset to zero
            if (iterations === totalImages) {
              nextIndex = 0; // Start from beginning
            }
        
            newIndices[postIndex] = nextIndex; // Set the new index
            return newIndices;
        });
      };
      const hhandleNext = (postIndex) => {
        ssetCurrentImageIndices((prevIndices) => {
            const newIndices = [...prevIndices]; // Create a copy of the current indices

            let currentIndex = newIndices[postIndex];
            const totalImages = project1.picture.length;
            let nextIndex = (currentIndex + 1) % totalImages;
        
            // Keep incrementing until a valid image is found or we've looped once
            let iterations = 0;
            while (
              !project1.picture[nextIndex] &&
              iterations < totalImages
            ) {
              nextIndex = (nextIndex + 1) % totalImages;
              iterations++;
            }
        
            // If iterations equals totalImages, it means all images are null, so we reset to zero
            if (iterations === totalImages) {
              nextIndex = 0; // Start from beginning
            }
        
            newIndices[postIndex] = nextIndex; // Set the new index
            return newIndices;
        });
      };
    const counter = 0;
    return (
        <div className="Home">
            <Helmet>
                <title>Christine Kim</title>
            </Helmet>
            <div className="shit">
                <h1>Hi, I'm Christine.</h1>
                <h3>I like to code.</h3>
                <h4> Check out my blog posts and projects :u</h4>
            </div>
            <div id="container">
                <div class="steam" id="steam1"> </div>
                <div class="steam" id="steam2"> </div>
                <div class="steam" id="steam3"> </div>
                <div class="steam" id="steam4"> </div>

                <div id="cup">
                    <div id="cup-body">
                        <div id="cup-shade"></div>
                    </div>
                    <div id="cup-handle"></div>
                </div>

                <div id="saucer"></div>

                <div id="shadow"></div>
            </div>
        </div>
    );
};
 
export default Home;