import React, { useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './css/login.css';

var posts = [{"header": "blahblah", "body": "yuhyuh", "picture": [null], "tag": "hytech"},
        {"header": "jahjah", "body": "kaka", "picture": ["yuh.png", null], "tag": "random"}];
var about = [];
const MAX_COUNT = 5;
//Change to recents
var highlights = [];

var projects = [{"header": "Project", "body":"project description", "picture":"yuh.png"}, {"header": "Poo poo", "body":"project description", "picture": null}];
var currentUser = [];


export { posts, projects, highlights };
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [fileProject, setProjectFile] = useState();

    //variables for post file upload
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);

    //functions
    const handleLogin = () => {
        if (username === "admin" && password === "admin") {
            setShowPopup(true);
        } else {
            setShowPopup(false);
            // Handle the login logic (authentication, error handling, etc.)
            // shit shit 
        }
    };
    const handleFileEvent =  (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }
    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
            }
            if (uploaded.length === MAX_COUNT) setFileLimit(true);
            if (uploaded.length > MAX_COUNT) {
                alert('nah bro');
                setFileLimit(false);
                limitExceeded = true;
                return true;
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)
    }
    const deleteFile = (fileId) => {
        // Update the state to remove the file with the given ID
        const updatedFiles = uploadedFiles.filter((file) => file.id !== fileId);
        setUploadedFiles(updatedFiles);
      };
    function handlePicProject(e) {
        console.log(e.target.files);
        setProjectFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div className="Login">
            <div className="loginContain">
                <h1 className="loginText">Login</h1>
                <input className="usernameLogin" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input className="passwordLogin" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div>
                    <button className="submitBtn" onClick={handleLogin}>Log in</button>
                    {showPopup && (
                        <Popup open={showPopup} onClose={() => setShowPopup(false)} modal>
                            <div>
                                <div className="popupContainer">
                                    <div className="Addpost">
                                        <input className="PostHeader" placeholder="Add header here"/>
                                        <input className="addPost" placeholder="Add text here"/>
                                        <div className="tags">
                                            <button className="tag1">Hytech</button>
                                            <button  className="tag2">Hytech</button>
                                            <button className="tag3">Hytech</button>
                                        </div>

                                        <input id='fileUpload' type='file' multiple
                                                accept='application/pdf, image/png'
                                                onChange={handleFileEvent}
                                                
                                        />

                                        <label htmlFor='fileUpload'>
                                            <a  className={`btn btn-primary ${!fileLimit ? '' : 'disabled' } `}>
                                                Upload Files
                                            </a>
                                        </label>
                                        
                                        <div className="uploaded-files-list">
                                            {uploadedFiles.map(file => (
                                                <div 
                                                    key={file.id} // Make sure to set a unique key for each item
                                                    onClick={() => deleteFile(file.id)}
                                                >
                                                    {file.name}
                                                </div>
                                            ))} 
                                        </div>

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
                            </div>
                        </Popup>
                    )}
                    <Popup trigger={<button className="noAccountYet">Register</button>} modal nested>
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
        </div>
    );
};


export default Login;