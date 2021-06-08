import PostCard from './PostCard';
import React, {useEffect, useState} from 'react';
import Spinner from 'react-bootstrap/Spinner'
import '../../App.css'
export default function Blog(){

    const [posts,setPosts] = useState(null);
    console.log(posts);

    useEffect(()=>{
        fetch("http://localhost:5000/blogpost")
            .then((res) => res.json())
            .then((res) => setPosts(res))
    },[])

    return(
        <div style={{paddingBottom:"5%"}}>
            <h1 style={{textAlign:"center",padding:"15px"}}>A Pretty Awesome <mark style={{backgroundColor:"#FDFD96"}}>Blog</mark>.</h1>
            {posts?(posts.map((post)=>{return(<PostCard postContent={post}/>)})):(
            <div class="center">
            <Spinner animation="grow"/>
            </div>)}
        </div>
    )

}