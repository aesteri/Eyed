import React, { useState } from "react";
import { highlights } from "./login.js";
import './css/about.css';
import { Helmet } from 'react-helmet'

 
const About = () => {
    
    return (
        <div className="About">
            <Helmet>
                <title>About Christine</title>
            </Helmet>
            <h1>
                About Me
            </h1>
            <div className="first">
                <div className="imageContain">
                    <img className="stacy" src='/pictures/meandstacy.png'/>
            
                </div>
                <div className="aboutSection">
                    <p>
                        I am a Korean American Georgia Tech student, majoring in Computer Science.
                        I concentrate in{' '}
                        <a href="https://www.cc.gatech.edu/academics/threads/intelligence" target="_blank" rel="noopener noreferrer">
                            Intelligence
                        </a> and {' '}
                        <a href="https://www.cc.gatech.edu/academics/threads/systems-architecture" target="_blank" rel="noopener noreferrer">
                            Systems Architecture
                        </a>.
                        I'm a data acquisitions member and acceleration driver for Hytech Racing. I contribute to the software of the car.
                    </p>
                    <p>
                        I spend most of my time working on software for Hytech Racing.
                        In my free time, though, I love baking! I love to bake cookies and macarons to anything like making bread from scratch and baking cake. 
                    </p>
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
                    <p>I'm getting ready to compete at Michigan FSAE 24 for hytech racing, and
                        I'm on track to study abroad at the Seoul National University in South Korea as a Gilman Scholar!
                    </p>
                </div>
                <div className="contactSection">
                    <h2>Contact</h2>
                    <ul>
                        <li>email:  ckim651@gatech.edu</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
 
export default About;