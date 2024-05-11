import React, { useState } from "react";
import { posts } from "./login.js"
import './css/blog.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'

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
            const newIndices = [...prevIndices]; // Create a copy of the current indices

            let currentIndex = newIndices[postIndex];
            const totalImages = filteredPosts[postIndex].picture.length;
            let nextIndex = (currentIndex + 1) % totalImages;
        
            // Keep incrementing until a valid image is found or we've looped once
            let iterations = 0;
            while (
              !filteredPosts[postIndex].picture[nextIndex] &&
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
        <div className="Blog">
            <Helmet>
                <title>Christine's Blog</title>
            </Helmet>
            <div className="firstContain">
                <h1>Posts</h1>
                <div className="tagContain">
                    <button className="tag" onClick={() => handleFilter("")}>all</button>
                    <button className="tag" onClick={() => handleFilter("hytech")}>hytech</button>
                    <button className="tag" onClick={() => handleFilter("baking")}>baking</button>
                    <button className="tag" onClick={() => handleFilter("exchange24")}>exchange @ SNU</button>
                    <button className="tag" onClick={() => handleFilter("gatech")}>gatech</button>
                </div>
            </div>
            <div className="grid-layout-post">
                {filteredPosts.map((post, index) => (
                    <div className="item" key={index}>    
                        <div className={`postContain ${post.tag}`} >
                            <Link className="yar" to={`/blog/post/${index}`}>{post.header}</Link>
                            <p>{post.date}</p>
                            <h3>{post.body.slice(0,50) + " ..."}</h3>
                            {/* Handle null or valid image src */}
                            <div className="pictureContain">
                                {post.picture[currentImageIndices[index]] ? (
                                    <img src={post.picture[currentImageIndices[index]]} alt={post.header} />
                                ) : null}
                                {post.picture.length > 1 && (
                                    <button className="nextnext" onClick={() => handleNext(index)}> » </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};
 
export default Blog;