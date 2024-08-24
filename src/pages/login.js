import React, { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './css/login.css';
import { Helmet } from 'react-helmet';
import TypingField from "./../components/TextInput/TypingField.tsx";


const MAX_COUNT = 5;
//Change to recents
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
    const [uusername, ssetUsername] = useState('');
    const [ppassword, ssetPassword] = useState('');
    const [repassword, ssetRePassword] = useState('');


    //admin
    const [title, settitle] = useState('');
    const [postinput, setPostInput] = useState('');
    const [image1, setimage1] = useState('');
    const [image2, setimage2] = useState('');
    const [image3, setimage3] = useState('');
    const [image4, setimage4] = useState('');
    const [image5, setimage5] = useState('');
    const [tag, settag] = useState('');
    const [selectedTag, setSelectedTag] = useState(""); // State to hold the selected tag value
    const handleTagSelection = (event) => {
        setSelectedTag(event.target.value); // Update the selected tag value when a radio button is clicked
    };

    const [projecttitle, setprojecttitle] = useState('');
    const [projectinput, setProjectInput] = useState('');
    const [img1, setimg1] = useState('');
    const [img2, setimg2] = useState('');
    const [img3, setimg3] = useState('');
    const [img4, setimg4] = useState('');
    const [img5, setimg5] = useState('');
    const [link, setlink] = useState('');


    useEffect(() => {
        // Fetch data from PHP script
        fetch('https://christineyewonkim.com/PHP/getUsers.php')
          .then(response => response.json())
          .then(data => setDataArray(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    //functions
    function usernameExists(username, userList) {
        return userList.some(user => user.username === username);
      }
      function userExists(username, password, userList) {
        return userList.some(user => user.username === username && user.password === password);
      }
    const handleControls = () => {
        setShowPopup(true);
    }
    const PostUpload = (e) => {
        e.preventDefault();
        handlePostUpload();
    }
    const ProjectUpload = (e) => {
        e.preventDefault();
        handleProjectUpload();
    }

    const handleLogin = () => {
        if (username === "admin" && password === "admin") {
            setLoggedInUser(username);
            setLoggedInUserState(username);
            setUsername("");
            setPassword("");
            setShowPopup(true);
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
    const nullHandler = (imageu) => {
        if (imageu === '' || imageu === null) {
            return null;
        } else {
            return imageu
        }
    }
    const handlePostUpload = async () => {
        try {
            const formData = new FormData();
            const current = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const date = current.toLocaleDateString('en-US', options);
            
            formData.append('title', title);
            formData.append('body', postinput);
            formData.append('image1', nullHandler(image1));
            formData.append('image2', nullHandler(image2));
            formData.append('image3', nullHandler(image3));
            formData.append('image4', nullHandler(image4));
            formData.append('image5', nullHandler(image5));
            formData.append('date', date);
            formData.append('tag', selectedTag);
            
            const response = await fetch('https://christineyewonkim.com/PHP/addPost.php', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit project');
            }
    
            const data = await response.text();
            //console.log(data);
        } catch (error) {
            console.error('Error submitting project:', error);
        }
    };
    const handleProjectUpload = async () => {
        try {
            const formData = new FormData();
            const current = new Date();
            const options = { year: 'numeric' };
            const date = current.toLocaleDateString('en-US', options);
            
            formData.append('title', projecttitle);
            formData.append('body', projectinput);
            formData.append('image1', nullHandler(img1));
            formData.append('image2', nullHandler(img2));
            formData.append('image3', nullHandler(img3));
            formData.append('image4', nullHandler(img4));
            formData.append('image5', nullHandler(img5));
            formData.append('date', date);
            formData.append('link', link);
            
            const response = await fetch('https://christineyewonkim.com/PHP/addProject.php', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit project');
            }
    
            const data = await response.text();
            //console.log(data);
        } catch (error) {
            console.error('Error submitting project:', error);
        }
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
        const response = await fetch('https://christineyewonkim.com/PHP/addUsers.php', {
          method: 'POST',
          body: formData,
        });
    
        const data = await response.text();
        //console.log(data);
      };
    return (
        <div className="Login">
            <Helmet>
                <title>{getLoggedInUser() == null ? "Login" : "Profile"}</title>
                <meta charSet="utf-8" />
                <link rel="icon" type="image/png" href="%PUBLIC_URL%/favicon.ico" sizes="16x16" />
            </Helmet>
            <h1 className="loginText">{getLoggedInUser() == null ? "Login" : "Profile"}</h1>
            {getLoggedInUser() == null ? null : (
                <div>
                    <h3>{getLoggedInUser()}</h3>
                    <button className="addProjectBtn" onClick={handleLogout}>Log out</button>
                </div>)}
                {showPopup && (
                        <Popup  contentStyle={{ maxHeight: "70vh", overflowY: "auto" }} className="poopy" open={showPopup} onClose={() => setShowPopup(false)} modal>
                            <div className="adminControl">
                                <div className="popupContainer">
                                    <h3>section divider = "AAAA"</h3>
                                    <div className="Addpost">
                                        <form id="post0">
                                            <div className="inputs">
                                                <input className="PostHeader" placeholder="Add header here" value={title} onChange={(event) => settitle(event.target.value)}/>
                                                <TypingField value={postinput} onChange={(newValue) => setPostInput(newValue)}/>
                                            </div>
                                            <div className="tags">
                                                <p className="tag1">
                                                <input type="radio" id="html" name="fav_language" value="Hytech" onChange={handleTagSelection}/>
                                                Hytech</p>

                                                <p className="tag1">
                                                <input type="radio" id="html" name="fav_language" value="Baking" onChange={handleTagSelection}/>
                                                Baking</p>

                                                <p className="tag1">
                                                <input type="radio" id="html" name="fav_language" value="Gatech" onChange={handleTagSelection}/>
                                                Gatech</p>

                                                <p className="tag1">
                                                <input type="radio" id="html" name="fav_language" value="Exchange24" onChange={handleTagSelection}/>
                                                Exchange24</p>
                                            </div>
                                            <div className="post_imgpath">
                                                <input className="file1" placeholder="image1" value={image1} onChange={(event) => setimage1(event.target.value)}/>
                                                <input className="file2" placeholder="image2" value={image2} onChange={(event) => setimage2(event.target.value)}/>
                                                <input className="file3" placeholder="image3" value={image3} onChange={(event) => setimage3(event.target.value)}/>
                                                <input className="file4" placeholder="image4" value={image4} onChange={(event) => setimage4(event.target.value)}/>
                                                <input className="file5" placeholder="image5" value={image5} onChange={(newValue) => setimage5(newValue.target.value)}/>
                                            </div>
                                            
                                        </form>
                                        <button className="addPostBtn" onClick={(e) => PostUpload(e)}>add Post</button>
                                    </div>
                                    
                                    <div className="Addproject">
                                        <form id="project0">
                                            <div className="inputs">
                                                <input className="projectHeader" placeholder="Add header here" value={projecttitle} onChange={(newValue) => setprojecttitle(newValue.target.value)}/>
                                                <TypingField value={projectinput} onChange={(newValue) => setProjectInput(newValue)}/>
                                                <input className="linkk" placeholder="Add link here" value={link} onChange={(newValue) => setlink(newValue.target.value)}/>
                                            </div>
                                            <div className="project_imgpath">
                                                <input className="file1" placeholder="image1" value={img1} onChange={(newValue) => setimg1(newValue.target.value)}/>
                                                <input className="file2" placeholder="image2" value={img2} onChange={(newValue) => setimg2(newValue.target.value)}/>
                                                <input className="file3" placeholder="image3" value={img3} onChange={(newValue) => setimg3(newValue.target.value)}/>
                                                <input className="file4" placeholder="image4" value={img4} onChange={(newValue) => setimg4(newValue.target.value)}/>
                                                <input className="file5" placeholder="image5" value={img5} onChange={(newValue) => setimg5(newValue.target.value)}/>
                                            </div>
                                        </form>
                                        <button className="addProjectBtn" onClick={(e) => ProjectUpload(e)}>add Project</button>
                                    </div>

                                    <button className="onCloseBtn" onClick={() => setShowPopup(false)}>Close</button>
                                </div>
                            </div>
                        </Popup>
                    )}
            {getLoggedInUser() == null ? (
            <div className="loginContain">
                <input className="usernameLogin" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input className="passwordLogin" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className="buttonContain">
                    <button className="submitBtn" onClick={handleLogin}>Log in</button>
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
            {getLoggedInUser() === 'admin' ? (
                <div> 
                    <button  className="shii" onClick={handleControls}>Controls</button>
                </div>) : null}
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