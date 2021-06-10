import PostCard from './PostCard';
import React, {useEffect, useState, useContext} from 'react';
import Spinner from 'react-bootstrap/Spinner'
import '../../App.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext.js";

export default function Blog(){
    const isAdmin = true;
    const [posts,setPosts] = useState(null);
    const history = useHistory();
    const { user } = useContext(UserContext);


    useEffect(()=>{
        fetch("http://localhost:5000/blogpost")
            .then((res) => res.json())
            .then((res) => {
                res.sort(function(a,b){
                    if(b.editDate&&a.editDate){
                    return new Date(b.editDate) - new Date(a.editDate);
                    }
                    else if(b.editDate){
                    return new Date(b.editDate) - new Date(a.date);
                    }
                    else if(a.editDate){
                    return new Date(b.date) - new Date(a.editDate);
                    }
                    else{
                    return new Date(b.date) - new Date(a.date);
                    }
                    });
                setPosts(res)})
    },[])

    return(
        <div style={{paddingBottom:(posts?"3%":"100%")}}>
            <div style={{display:"flex",justifyContent:"center"}}>
            <h1 style={{textAlign:"center",padding:"15px"}}>A Pretty Awesome <mark style={{backgroundColor:"#FDFD96"}}>Blog</mark>.</h1>
            {user&&user.is_admin&&<div style={{paddingTop:"12px"}}><Button style={{height:50,backgroundColor:"#4C6357",border:"none"}} onClick={(e)=>{
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