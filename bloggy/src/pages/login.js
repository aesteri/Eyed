import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
var posts = [{"header": "blahblah", "body": "yuhyuh", "picture": null, "tag": "hytech"},
        {"header": "jahjah", "body": "kaka", "picture": "yuh.png", "tag": "random"}];
var about = [];
var highlights = [];
var projects = [{"header": "Project", "body":"project description", "picture":"yuh.png"}, {"header": "Poo poo", "body":"project description", "picture": null}];
export { posts, projects, highlights };
const Login = () => {
    return (
        <div>
            <div className="loginContain">
                <h1 className="loginText">Login</h1>
                <input className="username" placeholder="Username"/>
                <input className="password" placeholder="Password"/>
            </div>
            <div>
                <button className="submitBtn">Log in</button>
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