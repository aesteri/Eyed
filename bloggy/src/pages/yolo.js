import React, { useState } from "react";
import { posts, projects } from "./login.js"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Edit = () => {
    return (
        <div>
            <div className="EditContainer">
                <div className="projectContain">
                    <ul>
                        {projects.map((project) => (
                            <li>    
                                <div className="projectContain">
                                    <h1>{project.header}</h1>
                                    <h3>{project.body}</h3>
                                    <img src={project.picture}/>
                                </div>
                                <Popup trigger={<button className="editProjectBtn">Edit</button>} modal nested>
                                    {
                                        close => (
                                            <div className="modal">
                                                <div>
                                                    <div className="Edit">
                                                        <h1 className="registerText">Register</h1>
                                                        <input className="header" placeholder="Header"/>
                                                        <input className="body" placeholder="Body"/>
                                                        <input className="picture" placeholder="Picture"/>
                                                    </div>
                                                    <button className="saveBtn" onClick={() => close()}>Save</button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </Popup>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="postContain"></div>
                <div className="highlightsContain"></div>
                <div className="aboutContain"></div>
            </div>
        </div>
    );
};
 
export default Edit;