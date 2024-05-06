import React, { useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './css/login.css';

var posts = [{"header": "blahblah", "body": "yuhyuh", "picture": [null], "tag": "hytech"},
        {"header": "jahjah", "body": "kaka", "picture": ["yuh.png", null], "tag": "random"}];
var about = [];

//Change to recents
var highlights = [];

var projects = [{"header": "Project", "body":"project description", "picture":"yuh.png"}, {"header": "Poo poo", "body":"project description", "picture": null}];
var currentUser = [];


export { posts, projects, highlights };
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [file, setFile] = useState();
    const [fileProject, setProjectFile] = useState();
    const handleLogin = () => {
        if (username === "admin" && password === "admin") {
            setShowPopup(true);
        } else {
            setShowPopup(false);
            // Handle the login logic (authentication, error handling, etc.)
            // shit shit 
        }
    };
    function handlePic(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    function handlePicProject(e) {
        console.log(e.target.files);
        setProjectFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div>
            <div className="loginContain">
                <h1 className="loginText">Login</h1>
                <input className="usernameLogin" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input className="passwordLogin" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
                <button className="submitBtn" onClick={handleLogin}>Log in</button>
                {showPopup && (
                    <Popup open={showPopup} onClose={() => setShowPopup(false)} modal>
                        <div>
                            <div className="Addpost">
                                <input className="PostHeader" placeholder="Add header here"/>
                                <input className="addPost" placeholder="Add text here"/>
                                <div className="tags">
                                    <button className="tag1">Hytech</button>
                                    <button  className="tag2">Hytech</button>
                                    <button className="tag3">Hytech</button>
                                </div>
                                <input type="file" onChange={handlePic}/>
                                <img className="postPreview" src={file} />
                                <button className="addPostBtn">add Post</button>
                            </div>
                            
                            <div className="Addproject">
                                <input className="projectHeader" placeholder="Add header here"/>
                                <input className="addProject" placeholder="Add Project here"/>
                                <input type="file" onChange={handlePicProject}/>
                                <img className="projectPreview" src={fileProject}/>
                                <button className="addProjectBtn">add Project</button>
                            </div>

                            <button className="onCloseBtn" onClick={() => setShowPopup(false)}>Close</button>
                        </div>
                    </Popup>
                )}
                <Popup trigger={<button className="noAccountYet">Sign in</button>} modal nested>
                    {
                        close => (
                            <div className="modal">
                                <div>
                                    <div className="registerContain">
                                        <h1 className="registerText">Register</h1>
                                        <input className="username" placeholder="Username"/>
                                        <input className="password" placeholder="Password"/>
                                        <input className="repassword" placeholder="Password"/>
                                    </div>
                                    <button className="registerBtn" onClick={() => close()}>Submit</button>
                                </div>
                            </div>
                        )
                    }
                </Popup>
            </div>
        </div>
    );
};


export default Login;