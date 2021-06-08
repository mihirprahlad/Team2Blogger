import PostCard from './PostCard';
import React, {useEffect, useState} from 'react';
export default function Blog(){

    const [posts,setPosts] = useState(null);
    console.log(posts);

    useEffect(()=>{
        fetch("http://localhost:5000/blogpost")
            .then((res) => res.json())
            .then((res) => setPosts(res))
    },[])

    return(
        <div>
            <h1 style={{textAlign:"center",padding:"15px"}}>My Blog.</h1>
            {posts.map((post)=>{return(<PostCard postContent={post}/>)})}
        </div>
    )

}