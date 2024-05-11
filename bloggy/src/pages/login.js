import React, { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './css/login.css';
import $ from "jquery";
import { Helmet } from 'react-helmet';
import TypingField from "./../components/TextInput/TypingField.tsx";

var posts;
fetch('http://christineyewonkim.com/getPosts.php')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Process the JSON data here
    console.log(data); // This will log the array of dictionaries to the console
    posts = data;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

var projects;
fetch('http://christineyewonkim.com/getProjects.php')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Process the JSON data here
    console.log(data); // This will log the array of dictionaries to the console
    projects = data;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });


const MAX_COUNT = 5;
//Change to recents
var highlights = [];

export function setLoggedInUser(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
}

// Function to get the logged-in user from local storage
export function getLoggedInUser() {
    const userJson = localStorage.getItem('loggedInUser');
    return userJson ? JSON.parse(userJson) : null;
}

// Function to clear the logged-in user from local storage
export function clearLoggedInUser() {
    localStorage.removeItem('loggedInUser');
}

export { posts, projects, highlights };
const Login = () => {
    const [loggedInUser, setLoggedInUserState] = useState(null);
    useEffect(() => {
        // Get the logged-in user from local storage when the component mounts
        const user = getLoggedInUser();
        setLoggedInUserState(user);
    }, []);
   

    const [dataArray, setDataArray] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [fileProject, setProjectFile] = useState();
    const [uusername, ssetUsername] = useState('');
    const [ppassword, ssetPassword] = useState('');
    const [repassword, ssetRePassword] = useState('');

    useEffect(() => {
        // Fetch data from PHP script
        fetch('http://christineyewonkim.com/getUsers.php')
          .then(response => response.json())
          .then(data => setDataArray(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);
    //variables for post file upload
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [uploadeddFiles, setUploadeddFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);

    //functions
    function usernameExists(username, userList) {
        return userList.some(user => user.username === username);
      }
      function userExists(username, password, userList) {
        return userList.some(user => user.username === username && user.password === password);
      }
    const handleLogin = () => {
        if (username === "admin" && password === "admin") {
            setShowPopup(true);
            setLoggedInUser(username);
            setLoggedInUserState(username);
            setUsername("");
            setPassword("");
            
        } else {
            setShowPopup(false);
            if (!userExists(username, password, dataArray)) {
                alert("Invalid credentials");
            } else {
                setLoggedInUser(username);
                setLoggedInUserState(username);
            }
            setUsername("");
            setPassword("");
            window.location.reload();
        }
    };
    const handleLogout = () => {
        // Clear the logged-in user from local storage
        clearLoggedInUser();
        setLoggedInUserState(null);
        window.location.reload();
    };
    const handleRegister = () => {
       if (usernameExists(uusername, dataArray)) {
         alert("Username Taken");
         return;
       } else if (ppassword != repassword){
            alert("passwords have to match!");
            return;
       } else {
            handleSQLuser();
            window.location.reload();
       }
    };
    const handleSQLuser = async () => {
        const formData = new FormData();
        formData.append('uusername', uusername);
        formData.append('ppassword', ppassword);
        const response = await fetch('http://christineyewonkim.com/addUsers.php', {
          method: 'POST',
          body: formData,
        });
    
        const data = await response.text();
        console.log(data);
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
                <title>{getLoggedInUser() == null ? "Login" : "Profile"}</title>
            </Helmet>
            <h1 className="loginText">{getLoggedInUser() == null ? "Login" : "Profile"}</h1>
            {getLoggedInUser() == null ? null : (
                <div>
                    <h3>{getLoggedInUser()}</h3>
                    <button className="addProjectBtn" onClick={handleLogout}>Log out</button>
                </div>)}
            {getLoggedInUser() == null ? (
            <div className="loginContain">
                <input className="usernameLogin" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input className="passwordLogin" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className="buttonContain">
                    <button className="submitBtn" onClick={handleLogin}>Log in</button>
                    {showPopup && (
                        <Popup open={showPopup} onClose={() => setShowPopup(false)} modal>
                            <div>
                                <div className="popupContainer">
                                    <h3>section divider = " YEWON "</h3>
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
                                                <input className="linkk" placeholder="Add link here"/>
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
                                    <form>
                                        <div className="registerContain">
                                            <h1 className="registerText">Register</h1>
                                            <input className="username" value={uusername} placeholder="Username"onChange={(e) => ssetUsername(e.target.value)}/>
                                            <input className="password" value={ppassword} placeholder="Password"onChange={(e) => ssetPassword(e.target.value)}/>
                                            <input className="repassword" value={repassword} placeholder="Repassword"onChange={(e) => ssetRePassword(e.target.value)}/>
                                        </div>
                                        <button type="submit"className="registerBtn" onClick={() => { close(); handleRegister(); }}>Submit</button>
                                    </form>
                                </div>
                            )
                        }
                    </Popup>
                </div>
            </div>
            ): null}
            <div className="catt">
                <div class="main">
                    <span class="stand"></span>
                    <div class="cat">
                    <div class="body"></div>
                    <div class="head">
                    <div class="ear"></div>
                    <div class="ear"></div>
                    </div>
                    <div class="face">
                    <div class="nose"></div>
                    <div class="whisker-container">
                    <div class="whisker"></div>
                    <div class="whisker"></div>
                    </div>
                    <div class="whisker-container">
                    <div class="whisker"></div>
                    <div class="whisker"></div>
                    </div>
                    </div>
                    <div class="tail-container">
                    <div class="tail">
                        <div class="tail">
                        <div class="tail">
                            <div class="tail">
                            <div class="tail">
                                <div class="tail">
                                <div class="tail"></div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Login;