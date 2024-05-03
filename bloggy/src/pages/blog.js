import React, { useState } from "react";
import { posts } from "./login.js"


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

    const handleFilter = (tag) => {
        // Filter posts and update the state
        const filtered = filterByTag(tag, posts);
        setFilteredPosts(filtered);
    };

    return (
        <div>
            <h1>You can write your blogs!</h1>;
            <div className="tagContain">
                <button className="tag" onClick={() => handleFilter("")}>all</button>
                <button className="tag" onClick={() => handleFilter("hytech")}>poo</button>
                <button className="tag">wee</button>
                <button className="tag">dee</button>
            </div>
            <ul>
                {filteredPosts.map((post) => (
                    <li>    
                        <div className="postContain">
                            <h1>{post.header}</h1>
                            <h3>{post.body}</h3>
                            <img src={post.picture}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};
 
export default Blog;