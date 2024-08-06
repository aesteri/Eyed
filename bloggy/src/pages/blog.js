import React, { useEffect, useState } from "react";
import './css/blog.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [currentImageIndices, setCurrentImageIndices] = useState(
       []// Initialize indices with 0 for each post
      );
    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        setFilteredPosts(posts);
        setCurrentImageIndices(Array(posts.length).fill(0));
    }, [posts]);

    const fetchPosts = () => {
        fetch('https://christineyewonkim.com/PHP/getPosts.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //console.log(data); // Log the fetched data
                setPosts(data.reverse());
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const filterByTag = (tag) => {
        if (tag === "all" || tag === "") {
            return posts;
        }
        return posts.filter((post) => post.tag === tag).reverse();
    };

    const handleFilter = (tag) => {
        const filtered = filterByTag(tag);
        setFilteredPosts(filtered);
        setCurrentImageIndices(Array(filtered.length).fill(0)); // Reset image indices
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
    return (
        <div className="Blog">
            <Helmet>
                <title>Christine's Blog</title>
                <meta charSet="utf-8" />
                <link rel="icon" type="image/png" href="%PUBLIC_URL%/favicon.ico" sizes="16x16" />
            </Helmet>
            <div className="firstContain">
                <h1>Posts</h1>
                <div className="tagContain">
                    <button className="tag" onClick={() => handleFilter("")}>all</button>
                    <button className="tag" onClick={() => handleFilter("Hytech")}>hytech</button>
                    <button className="tag" onClick={() => handleFilter("Baking")}>baking</button>
                    <button className="tag" onClick={() => handleFilter("Exchange24")}>exchange @ SNU</button>
                    <button className="tag" onClick={() => handleFilter("Gatech")}>gatech</button>
                </div>
            </div>
            <div className="grid-layout-post">
                {filteredPosts.map((post, index) => (
                    <div className="item" key={index}>    
                        <div className={`postContain ${post.tag}`} >
                            <Link className="yar" to={`/blog/post/${ parseInt(post.header.split(".")[0], 10) }`}>{post.header.split(".")[1]}</Link>
                            <p>{post.date}</p>
                            <h3>{post.body[0].slice(0,50) + "..."}</h3>
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
            {posts.length===0 && (
                    <div className="na">
                    <div class="loader"></div>
                </div>
                )}
        </div>
    )
};
 
export default Blog;