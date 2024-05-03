import React, { useState } from "react";
import { projects } from "./login.js"


const Project = () => {

    return (
        <div>
            <ul>
                {projects.map((project) => (
                    <li>    
                        <div className="projectContain">
                            <h1>{project.header}</h1>
                            <h3>{project.body}</h3>
                            <img src={project.picture}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
 
export default Project;