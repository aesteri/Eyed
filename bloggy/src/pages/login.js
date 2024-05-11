import React, { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './css/login.css';
import { Helmet } from 'react-helmet';
import TypingField from "./../components/TextInput/TypingField.tsx";

var posts = [{"header": "Strawberry cakes", "body": ["today I made some really good bread.today I made some really good bread. i made soe cake! yaya. This is filler. Idk what etoday I made some really good bread. i made soe cake! yaya. This is filler. Idk what etoday I made some really good bread. i made soe cake! yaya. This is filler. Idk what e i made soe cake! yaya. This is filler. Idk what else to say but I hope it is long im tiredaf too fuckkkkfsidfusdf but no cussing allowed fosho","today I made some really good bread.today I made some really good bread. i made soe cake! yaya. This is filler. Idk what etoday I made some really good bread. i made soe cake! yaya. This is filler. Idk what etoday I made some really good bread. i made soe cake! yaya. This is filler. Idk what e i made soe cake! yaya. This is filler. Idk what else to say but I hope it is long im tiredaf too fuckkkkfsidfusdf but no cussing allowed fosho"], "picture": [null], "tag": "baking", "date": "May 10, 2024"},
        {"header": "Hytech late night", "body": ["kaktoday I made some really good bread. i made soe cake! yaya. This is filler. Idk what etoday I made some really good bread. i made soe cake! yaya. This is filler. Idk what etoday I made some really good bread. i made soe cake! yaya. This is filler. Idk what etoday I made some really good bread. i made soe cake! yaya. This is filler. Idk what ea"], "picture": ["/pictures/flower.png", null, "/pictures/flowerbasket.png"], "tag": "hytech", "date": "May 5, 2024"},
        {"header": "I spilled the milk", "body": ["katoday I made some really good bread. i made soe cake! yaya. This is filler. Idk what etoday I made some really good bread. i made soe cake! yaya. This is filler. Idk ","what etoday I made some really good bread. i made soe cake! yaya. This is filler. Idk what etoday I made some really good bread. i made soe cake! yaya. This is filler. ","Idk what etoday I made some really good bread. i made soe cake! yaya. This is filler. Idk what etoday I made some really good bread. i made soe cake! yaya. This is filler. Idk what ea"], "picture": ["/pictures/meandstacy.png", null, "/pictures/flower.png"], "tag": "exchange24", "date": "May 3, 2024"},
        {"header": "A day with me at my internship", "body": ["kaka"], "picture": ["/pictures/meandstacy.png", null, "/pictures/flower.png"], "tag": "gatech", "date": "May 5, 2024"}];
var about = []; 
const MAX_COUNT = 5;
//Change to recents
var highlights = [];

var projects = [{"header": "Project", "body":"project description and I like li liek like lei ke i nad yeah thats funny omg hahahahhaha liemp pteuim", "picture":["/pictures/flower.png", "/pictures/meandstacy.png"], "link":"google.com", "date": "2023"},
     {"header": "Poo poo", "body":"project description", "picture": [null], "link":"google.com", "date":"2022"}];
var currentUser = [];


export { posts, projects, highlights };
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [fileProject, setProjectFile] = useState();

    //variables for post file upload
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [uploadeddFiles, setUploadeddFiles] = useState([])
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
    const hhandleFileEvent =  (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        hhandleUploadFiles(chosenFiles);
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

    const hhandleUploadFiles = files => {
        const uploaded = [...uploadeddFiles];
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
        if (!limitExceeded) setUploadeddFiles(uploaded)
    }
    const deleteFile = (fileId) => {
        // Update the state to remove the file with the given ID
        const updatedFiles = uploadedFiles.filter((file) => file.id !== fileId);
        setUploadedFiles(updatedFiles);
      };
      const ddeleteFile = (fileId) => {
        // Update the state to remove the file with the given ID
        const updatedFiles = uploadeddFiles.filter((file) => file.id !== fileId);
        setUploadeddFiles(updatedFiles);
      };
    function handlePicProject(e) {
        console.log(e.target.files);
        setProjectFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div className="Login">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <h1 className="loginText">Login</h1>
            <div className="loginContain">
                <input className="usernameLogin" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input className="passwordLogin" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className="buttonContain">
                    <button className="submitBtn" onClick={handleLogin}>Log in</button>
                    {showPopup && (
                        <Popup open={showPopup} onClose={() => setShowPopup(false)} modal>
                            <div>
                                <div className="popupContainer">
                                    <div className="Addpost">
                                        <form id="post0">
                                            <div className="inputs">
                                                <input className="PostHeader" placeholder="Add header here"/>
                                                <TypingField/>
                                                <input className="date" placeholder="Add date here"/>
                                            </div>
                                            <div className="tags">
                                                <input type="radio" id="html" name="fav_language" value="HTML"/>
                                                <p className="tag1">Hytech</p>
                                                <input type="radio" id="html" name="fav_language" value="HTML"/>
                                                <p className="tag1">Baking</p>
                                                <input type="radio" id="html" name="fav_language" value="HTML"/>
                                                <p className="tag1">Gatech</p>
                                                <input type="radio" id="html" name="fav_language" value="HTML"/>
                                                <p className="tag1">Exchange24</p>
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
                                        </form>
                                        <button className="addPostBtn">add Post</button>
                                    </div>
                                    
                                    <div className="Addproject">
                                        <form id="project0">
                                            <div className="inputs">
                                                <input className="projectHeader" placeholder="Add header here"/>
                                                <TypingField/>
                                                <input className="datee" placeholder="Add date here"/>
                                            </div>

                                            <input id='fileUploadd' type='file' multiple
                                                    accept='application/pdf, image/png'
                                                    onChange={hhandleFileEvent}
                                                    
                                            />

                                            <label htmlFor='fileUploadd'>
                                                <a  className={`btnn btn-primary ${!fileLimit ? '' : 'disabled' } `}>
                                                    Upload Files
                                                </a>
                                            </label>
                                            
                                            <div className="uploadedd-files-list">
                                                {uploadeddFiles.map(file => (
                                                    <div 
                                                        key={file.id} // Make sure to set a unique key for each item
                                                        onClick={() => ddeleteFile(file.id)}
                                                    >
                                                        {file.name}
                                                    </div>
                                                ))} 
                                            </div>
                                        </form>
                                        



                                        <button className="addProjectBtn">add Project</button>
                                    </div>

                                    <button className="onCloseBtn" onClick={() => setShowPopup(false)}>Close</button>
                                </div>
                            </div>
                        </Popup>
                    )}
                    <Popup className='important' trigger={<button className="noAccountYet">Register</button>} modal nested>
                        {
                            close => (
                                <div className="modal">
                                    <div>
                                        <div className="registerContain">
                                            <h1 className="registerText">Register</h1>
                                            <input className="username" placeholder="Username"/>
                                            <input className="password" placeholder="Password"/>
                                            <input className="repassword" placeholder="Repassword"/>
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