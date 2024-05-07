import React, { useState } from "react";
import { posts } from "./login.js"
import './css/blog.css';

const filterByTag = (tag) => {
    if (tag === "all" || tag === "") {
        // Return all posts if the tag is "all" or empty
        return posts;
    }
    // Use the filter method to get posts with the specified tag
    return posts.filter((post) => post.tag === tag);
};



const Blog = () => {
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [currentImageIndices, setCurrentImageIndices] = useState(
        Array(posts.length).fill(0) // Initialize indices with 0 for each post
      );
    const handleFilter = (tag) => {
        // Filter posts and update the state
        const filtered = filterByTag(tag, posts);
        setFilteredPosts(filtered);
    };
    const handleNext = (postIndex) => {
        setCurrentImageIndices((prevIndices) => {
          // Increment the current index for the specific post
          const newIndices = [...prevIndices];
          newIndices[postIndex] = (newIndices[postIndex] + 1) % filteredPosts[postIndex].picture.length; // Loop back if exceeding
          return newIndices;
        });
      };
    const counter = 0;
    return (
        <div className="Blog">
            <h1>You can write your blogs!</h1>;
            <div className="tagContain">
                <button className="tag" onClick={() => handleFilter("")}>all</button>
                <button className="tag" onClick={() => handleFilter("hytech")}>poo</button>
                <button className="tag">wee</button>
                <button className="tag">dee</button>
            </div>
            <ul>
                {filteredPosts.map((post, index) => (
                    <li key={index}>    
                        <div className="postContain">
                            <h1>{post.header}</h1>
                            <h3>{post.body}</h3>
                            {/* Handle null or valid image src */}
                            {post.picture[currentImageIndices[index]] ? (
                                <img src={post.picture[currentImageIndices[index]]} alt={post.header} />
                            ) : (
                                <p>No Image Available</p>
                            )}
                            {post.picture.length > 1 && (
                                <button onClick={() => handleNext(index)}>Next Image</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};
 
export default Blog;