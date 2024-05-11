import React, {  useState, useRef, useEffect } from "react";
import './postpage.css';
import { Helmet } from 'react-helmet'
import { getLoggedInUser } from "../login.js"
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TypingField from "../../components/TextInput/TypingField.tsx";


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

const PostPage = () => {
    const [commentinput, setComment] = useState('');    
    const [comments, setComments] = useState([]);  
    useEffect(() => {
        // Fetch data from PHP script
        fetch('http://christineyewonkim.com/getComments.php')
          .then(response => response.json())
          .then(data => setComments(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { postId } = useParams();
    
    console.log(getLoggedInUser());
    const curr = comments[postId]?.comments || [];

    const postHeader = posts[postId].header;
    const postDetails = posts[postId].body;
    const postDate = posts[postId].date;
    const postPictures = posts[postId].picture;

   
    const handleSQLcomment = async () => {
        if (!(getLoggedInUser() === null)) {
            const username = getLoggedInUser();
            const today = getDate();
            const formData = new FormData();
            formData.append('postId', postId);
            formData.append('username', username);
            formData.append('today', today);
            formData.append('commentinput', commentinput);
            const response = await fetch('http://christineyewonkim.com/addComments.php', {
                method: 'POST',
                body: formData,
            });
        
            const data = await response.text();
            console.log(data);
        }
    };
    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    }

    const handleNext = () => {
        setCurrentImageIndex(prevIndex => {
            const totalImages = postPictures.length;
            let nextIndex = (prevIndex + 1) % totalImages;
        
            // Keep incrementing until a valid image is found or we've looped once
            let iterations = 0;
            while (!postPictures[nextIndex] && iterations < totalImages) {
                nextIndex = (nextIndex + 1) % totalImages;
                iterations++;
            }
        
            // If iterations equals totalImages, it means all images are null, so we reset to zero
            if (iterations === totalImages) {
                nextIndex = 0; // Start from beginning
            }
        
            return nextIndex; // Set the new index
        });
      };
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
                            {postDetails.map((section, index) => (
                                <div>
                                    <p>{postDetails[index]}</p>
                                </div>
                            ))}
                        </div>
                        {/* Handle null or valid image src */}
                        <div className="pictureContain">
                            {postPictures[currentImageIndex] ? (
                                <img className="lol" src={postPictures[currentImageIndex]} alt={postHeader} />
                            ) : null}
                            {postPictures.length > 1 && (
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
                            <TypingField className="inputt" value={commentinput} onChange={(e) => setComment(e.target.value)} />
                            <button className="comentbtn">Comment</button>
                        </div>
                    </form>
                    {curr.map((comment, index) => (
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