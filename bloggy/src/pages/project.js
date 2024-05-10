import React, { useState } from "react";
import { projects } from "./login.js"
import './css/project.css';

const Project = () => {
    const [currentImageIndices, setCurrentImageIndices] = useState(
        Array(projects.length).fill(0) // Initialize indices with 0 for each post
      );
    const handleNext = (projectIndex) => {
        setCurrentImageIndices((prevIndices) => {
            // Increment the current index for the specific post
            const newIndices = [...prevIndices];
            newIndices[projectIndex] = (newIndices[projectIndex] + 1) % projects[projectIndex].picture.length; // Loop back if exceeding
            return newIndices;
        });
    };
    const counter = 0;
    return (
        <div className="Projects">
            <div className="heading">
                <h1>Projects</h1>
            </div>
            <div className="grid-layout">
                {projects.map((project, index) => (
                    <div className="item" key={index}>    
                        <div className="projectContain">
                            <h1>{project.header}</h1>
                            <h3>{project.body}</h3>
                            <div className="pictureContain">
                                {project.picture[currentImageIndices[index]] ? (
                                    <img src={project.picture[currentImageIndices[index]]} alt={project.header} />
                                ): null}
                                
                                {project.picture.length > 1 && (
                                    <button className="nextnext" onClick={() => handleNext(index)}> » </button>
                                )}
                            </div>
                            {project.link && (
                                    <a className="visit_project" href={project.link} target="_blank" rel="noopener noreferrer">
                                    Visit Project
                                    </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
 
export default Project;