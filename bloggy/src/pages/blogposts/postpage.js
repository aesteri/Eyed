import React, {  useState, useRef, useEffect } from "react";
import './postpage.css';
import { Helmet } from 'react-helmet'
import { getLoggedInUser } from "../login.js"
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TypingField from "../../components/TextInput/TypingField.tsx";


const PostPage = () => {
    const [commentInput, setCommentInput] = useState('');
    const [showAllComments, setShowAllComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [post, setPost] = useState({ header: "", body: [], date: "", picture: [] });

    const { postId } = useParams();
    useEffect(() => {
        fetchPostData();
        fetchComments();
    }, []);

    const fetchPostData = () => {
        fetch('https://christineyewonkim.com/PHP/getPosts.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //console.log(data); // Log the fetched data
                setPost(data[postId]);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const fetchComments = () => {
        fetch('https://christineyewonkim.com/PHP/getComments.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //console.log(data); // Log the fetched data
                setComments(data[postId]?.comments || []);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };
    const handleNext = () => {
        setCurrentImageIndex(prevIndex => {
            const totalImages = post.picture.length;
            let nextIndex = (prevIndex + 1) % totalImages;

            let iterations = 0;
            while (!post.picture[nextIndex] && iterations < totalImages) {
                nextIndex = (nextIndex + 1) % totalImages;
                iterations++;
            }

            if (iterations === totalImages) {
                nextIndex = 0; // Start from beginning
            }

            return nextIndex;
        });
    };
    const handleViewAllComments = () => {
        setShowAllComments(!showAllComments);
    };
    const handleHideComments = () => {
        setShowAllComments(false);
    };
    const visibleComments = showAllComments ? comments : comments.slice(0, 2); // Show only 5 comments initially
    const handleComment = (e) => {
        e.preventDefault();
        if (commentInput === null || commentInput === '') {
            alert('You need to write something!');
        } else if ((getLoggedInUser() === null || getLoggedInUser() === '')) {
            alert("You need an account!");
        } else {
            handleSQLComment();
            setCommentInput('');
        }
    };
    const handleSQLComment = async () => {
        try {
            const formData = new FormData();
            const current = new Date();
            const year = current.getFullYear();
            const month = current.getMonth() + 1;
            const day = current.getDate();
            const today = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
            const username = getLoggedInUser();
            const commentinput = commentInput;
            const postIdInt = parseInt(postId, 10);
            formData.append('postId', postIdInt);
            formData.append('username', username);
            formData.append('today', today);
            formData.append('commentinput', commentinput);
            
            const response = await fetch('https://christineyewonkim.com/PHP/addComments.php', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }
    
            const data = await response.text();
            //console.log(data);
            fetchComments();
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };
    return (
        <div className="PostPage">
            <Helmet>
                <title>{post.header}</title>
            </Helmet>
            <Link className="backbtn" to={`/blog`}>Go Back</Link>
            <div className="containerr">
                <div className="blogpage">
                    <h1>{post.header}</h1>
                    <h3>{post.date}</h3>
                    <div className="themeat">
                        <div className="textt">
                            {post.body.map((section, index) => (
                                <div>
                                    <p>{section}</p>
                                </div>
                            ))}
                        </div>
                        {/* Handle null or valid image src */}
                        <div className="pictureContain">
                            {post.picture[currentImageIndex] ? (
                                <img className="lol" src={post.picture[currentImageIndex]} alt={post.header} />
                            ) : null}
                            {post.picture.length > 1 && (
                                <button className="nextnext" onClick={() => handleNext()}> » </button>
                            )}
                        </div>
                    </div>
                    <div className="reccomendedContainer">
                        <div className="highlight">

                        </div>
                    </div>
                </div>
                <div className="commentContainer">
                    <form>
                        <div className="commentinput">
                            <TypingField className="inputt" value={commentInput} onChange={(newValue) => setCommentInput(newValue)} />
                            <button className="comentbtn" onClick={(e) => handleComment(e)}>Comment</button>
                        </div>
                    </form>
                    <div className="thetea">
                        {visibleComments.map((comment, index) => (
                            <div className="commentsection">
                                {/* Handle null or valid image src */}
                                {comment != null ? (
                                    <div className="commentyar">
                                        <div class="userId">
                                            <h3 className={comment.user === 'admin' ? 'admin-user' : ''}>{comment.user}</h3>
                                            <h4>{comment.date}</h4>
                                        </div>
                                        <h4>{comment.comment}</h4>
                                    </div>
                                ) : (
                                    <div className="null">
                                        <h4>Be the first to comment!</h4>
                                    </div>
                                )}
                            </div>
                        ))}
                        {comments.length == 0 && (
                            <div className="null">
                                <h4>Be the first to comment!</h4>
                            </div>
                        )}
                        {/* Button to toggle showing all comments */}
                        {!showAllComments && comments.length > 2 && (
                            <button className="comentbtn" onClick={handleViewAllComments}>View All Comments</button>
                        )}
                        {showAllComments && (
                            <button className="comentbtn" onClick={handleHideComments}>Hide Comments</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default PostPage;