import React, { useState } from "react";
import { highlights } from "./login.js";
import './css/about.css';
import { Helmet } from 'react-helmet'
import { setLoggedInUser, getLoggedInUser, clearLoggedInUser } from './login.js';


 
const About = () => {
    //console.log(getLoggedInUser());

    return (
        <div className="About">
            <Helmet>
                <title>About Christine</title>
                <meta charSet="utf-8" />
                <meta name="description" content="About Christine" />
                <meta name="keywords" content="Christine, about, software engineering, portfolio" />
                <link rel="icon" type="image/png" href="%PUBLIC_URL%/favicon.ico" sizes="16x16" />
                <link rel="preload" href="/pictures/meandstacy.png" as="image"/>
            </Helmet>
            <h1>
                About Me
            </h1>
            <div className="first">
                <div className="imageContain">
                    <img className="stacy" src='/pictures/meandstacy.png' loading="eager"/>
                </div>
                <div className="aboutSection">
                    <p>
                        I am a Korean American Georgia Tech student, majoring in Computer Science.
                        I concentrate in{' '}
                        <a href="https://www.cc.gatech.edu/academics/threads/modeling-simulation" target="_blank" rel="noopener noreferrer">
                            Modeling Simulation
                        </a> and {' '}
                        <a href="https://www.cc.gatech.edu/academics/threads/systems-architecture" target="_blank" rel="noopener noreferrer">
                            Systems Architecture
                        </a>.
                        I'm the Data Operations Lead for Hytech Racing, and I contribute to the software of the car. In 2024, I was the acceleration driver for HyTech Racing, breaking the North American record for fastest FSAE electric acceleration time.
                    </p>
                    <p>
                        I spend most of my time working on software for Hytech Racing.
                        In my free time, though, I love baking! I love to bake cookies and macarons to anything like making bread from scratch and baking cake. 
                    </p>
                    <a href="https://www.instagram.com/ddalgi_patissiere/" target="_blank" rel="noopener noreferrer">
                        Follow me along my journey in being a part-time pâtissière! 
                    </a>.
                </div>
            </div>
            <div className="together">
                <div className="faqSection">
                    <h2>FAQ</h2>
                    <h3>What is Hytech?</h3>
                    <p>HyTech Racing is an award-winning student-run organization at the Georgia 
                        Institute of Technology dedicated to furthering students'
                        engineering experience through the rigorous design and development of 
                        Formula SAE electric vehicles.
                    </p>
                    <p>
                        Check out their {' '}
                        <a href="https://hytechracing.gatech.edu/" target="_blank" rel="noopener noreferrer">
                            website
                        </a>!
                    </p>
                    <h3>What am I doing now?</h3>
                    <p>I'm getting ready to compete at Michigan FSAE 25 for hytech racing.
                        Follow me on LinkedIn for more updates!
                        
                    </p>
                </div>
                <div className="sideSection">
                    <div className="contactSection">
                        <h2>Contact</h2>
                        <ul>
                            <li>email:  ckim651@gatech.edu</li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
 
export default About;