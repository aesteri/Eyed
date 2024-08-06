import React, { useEffect, useState } from "react";
import './css/project.css';
import { Helmet } from 'react-helmet'


const Project = () => {
    const [projects, setProjects] = useState([]);
    const [currentImageIndices, setCurrentImageIndices] = useState(
        [] // Initialize indices with 0 for each post
      );

      useEffect(() => {
        fetch('https://christineyewonkim.com/PHP/getProjects.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Process the JSON data here
                //console.log(data); // This will log the array of dictionaries to the console
                // Process the JSON data here
                const sortedProjects = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setProjects(sortedProjects.reverse());
                setCurrentImageIndices(Array(sortedProjects.length).fill(0));
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []); 
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
            <Helmet>
                <title>Christine's Projects</title>
                <meta charSet="utf-8" />
                <link rel="icon" type="image/png" href="%PUBLIC_URL%/favicon.ico" sizes="16x16" />
            </Helmet>
            <div className="heading">
                <h1>Projects</h1>
            </div>
            <div className="gridd">
                <div className="gridddy">
                    <div className="grid-layout">
                        {projects.map((project, index) => (
                            <div className="item" key={parseInt(project.header.split(".")[0])}>    
                                <div className="projectContain">
                                    <div className="textimg">
                                        <h1>{project.header.split(".")[1]}</h1>
                                        <p>{project.date}</p>
                                        <h3>{project.body}</h3>
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
            </div>
            {projects.length===0 && (
                    <div className="na">
                        <div class="loader"></div>
                    </div>
                )}
        </div>
    );
};
 
export default Project;