import React, { useState } from "react";
import { posts, projects } from "./login.js"
import './css/index.css';
import { Helmet } from 'react-helmet'
 
const Home = () => {
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