import React, {useContext, useEffect, useState} from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import PostCard from "./PostCard"
import {UserContext} from "./../../contexts/UserContext"
import SignIn from "./../SignIn"
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";


export default function Forum() {
    const [posts, setPosts] = useState(null);
    const {user} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        console.log("useEffect");
        fetch("http://localhost:5000/forumpost")
            .then((res) => {
                return(res.json())
            })
            .then((obj) => {
                obj.sort(function(a,b){
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
                setPosts(obj)
            });
    }, [])

    const display = <div style = {{paddingBottom: "5%"}}>
        <div style={{display:"flex",justifyContent:"center"}}>
            <h1 style = {{textAlign: "center", padding:"15px"}}>Hear from the fans!</h1>
            {user && <div style = {{paddingTop: "12px"}}>
                <Button style = {{height:50}} onClick={(e) => {
                    history.push("/newforumpost");
                    e.stopPropagation();
                }}>
                    New Post
                </Button>
            </div>}
        </div>
        {user ?
            posts ? 
                posts.map((post) => {
                    return(
                        <PostCard postContent = {post}/>
                    )
                })
            :
            <div class = "text-center">
                <Spinner animation = "grow"/>
            </div>
        :
        <div class = "text-center">
            <h3 style = {{padding:"15px"}}>You must log in to view forum posts!</h3>
                <SignIn/>
        </div>
        }
    </div>

    return(
        display
    );
}