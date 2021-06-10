import PostCard from './PostCard';
import React, {useEffect, useState, useRef,Link,useContext} from 'react';
import Spinner from 'react-bootstrap/Spinner'
import '../../App.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useHistory} from "react-router-dom";
import {UserContext} from '../../contexts/UserContext'

export default function Blog(){

    const [posts,setPosts] = useState(null);
    const history = useHistory();
    const {user} = useContext(UserContext);

    useEffect(()=>{
        fetch("http://localhost:5000/blogpost")
            .then((res) => res.json())
            .then((res) => setPosts(res))
    },[])

    return(
        <div style={{paddingBottom:"5%"}}>
            <div style={{display:"flex",justifyContent:"center"}}>
            <h1 style={{textAlign:"center",padding:"15px"}}>A Pretty Awesome <mark style={{backgroundColor:"#FDFD96"}}>Blog</mark>.</h1>
            {user.is_admin&&<div style={{paddingTop:"12px"}}><Button style={{height:50}} onClick={(e)=>{
            history.push("/newpost");
            e.stopPropagation();
            }}>New Post</Button></div>}
            </div>
            {posts?(posts.map((post)=>{return(<PostCard postContent={post}/>)})):(
            <div class="center">
            <Spinner animation="grow"/>           
            </div>)}
        </div>
    )

}