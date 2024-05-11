import React, {  useState, useRef, useEffect } from "react";
import './postpage.css';
import { Helmet } from 'react-helmet'
import { posts } from "../login.js"
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TypingField from "../../components/TextInput/TypingField.tsx";

const comments = [{'postId': 0, 'comments': [{'user':'Maxxyh', 'date':'May 3, 2024', 'comment': 'Omg this is so cool!'}]},
{'postId': 1, 'comments': [{'user':'Maxxyh', 'date':'May 3, 2024', 'comment': 'Omg this is so cool!'}]},
{'postId': 2, 'comments': [{'user':'Maxxyh', 'date':'May 3, 2024', 'comment': 'Omg this is so cool!'}, {'user':'Maxxyh', 'date':'May 3, 2024', 'comment': 'Omg this is so cool!'}]},
{'postId': 3, 'comments': [null]}];


const PostPage = () => {
    const [currentImageIndices, setCurrentImageIndices] = useState(
        Array(posts.length).fill(0) // Initialize indices with 0 for each post
      );
    const { postId } = useParams();

    const curr= comments[postId].comments;

    const postHeader = posts[postId].header;
    const postDetails = posts[postId].body;
    const postDate = posts[postId].date;
    const postPictures = posts[postId].picture;

    const handleNext = (postIndex) => {
        setCurrentImageIndices((prevIndices) => {
            const newIndices = [...prevIndices]; // Create a copy of the current indices

            let currentIndex = newIndices[postIndex];
            const totalImages = postPictures.length;
            let nextIndex = (currentIndex + 1) % totalImages;
        
            // Keep incrementing until a valid image is found or we've looped once
            let iterations = 0;
            while (
              !postPictures[nextIndex] &&
              iterations < totalImages
            ) {
              nextIndex = (nextIndex + 1) % totalImages;
              iterations++;
            }
        
            // If iterations equals totalImages, it means all images are null, so we reset to zero
            if (iterations === totalImages) {
              nextIndex = 0; // Start from beginning
            }
        
            newIndices[postIndex] = nextIndex; // Set the new index
            return newIndices;
        });
      };
    const counter = 0;
    return (
        <div className="PostPage">
            <Helmet>
                <title>{postHeader}</title>
            </Helmet>
            <Link className="backbtn" to={`/blog`}>Go Back</Link>
            <div className="containerr">
                <div className="blogpage">
                    <h1>{postHeader}</h1>
                    <h3>{postDate}</h3>
                    <div className="themeat">
                        
                        <div className="textt">
                            
                            <p>{postDetails}</p>
                            <p>{postDetails}</p>
                            <p>{postDetails}</p>
                        </div>
                        {/* Handle null or valid image src */}
                        <div className="pictureContain">
                            {postPictures[currentImageIndices[postId]] ? (
                                <img className="lol" src={postPictures[currentImageIndices[postId]]} alt={postHeader} />
                            ) : null}
                            {postPictures.length > 1 && (
                                <button className="nextnext" onClick={() => handleNext(postId)}> » </button>
                            )}
                        </div>
                    </div>
                    <div className="reccomendedContainer">
                        <div className="highlight">

                        </div>
                    </div>
                </div>
                <div className="commentContainer">
                    <div className="commentinput">
                        <TypingField className="inputt"/>
                        <button className="comentbtn">Comment</button>
                    </div>
                    {curr.map((comment, index) => (
                        <div className="commentsection">
                            {/* Handle null or valid image src */}
                            {comment != null ? (
                                <div className="commentyar">
                                    <div className="userId">
                                        <h3>{comment.user}</h3>
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