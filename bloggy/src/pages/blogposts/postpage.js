import React, {  useState, useRef, useEffect } from "react";
import './postpage.css';
import { Helmet } from 'react-helmet'
import { getLoggedInUser } from "../login.js"
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TypingField from "../../components/TextInput/TypingField.tsx";


const PostPage = () => {
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [post, setPost] = useState({ header: "", body: [], date: "", picture: [] });

    const { postId } = useParams();

    useEffect(() => {
        fetchPostData();
        fetchComments();
    }, []);

    const fetchPostData = () => {
        fetch('http://christineyewonkim.com/getPosts.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log the fetched data
                setPost(data[postId]);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const fetchComments = () => {
        fetch('http://christineyewonkim.com/getComments.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log the fetched data
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
    const handleComment = () => {
        // Add your comment submission logic here
        console.log("Comment submitted:", commentInput);
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
                            <TypingField className="inputt" value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />
                            <button className="comentbtn" onClick={handleComment}>Comment</button>
                        </div>
                    </form>
                    {comments.map((comment, index) => (
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
                    
                </div>
            </div>
        </div>
    );
};
 
export default PostPage;