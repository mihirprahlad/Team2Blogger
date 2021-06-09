import React, {useContext, useEffect, useState} from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import PostCard from "./PostCard"
import {UserContext} from "./../../contexts/UserContext"
import SignIn from "./../SignIn"

export default function Forum() {
    const [posts, setPosts] = useState(null);
    const {user} = useContext(UserContext);
    
    useEffect(() => {
        console.log("useEffect");
        console.log(user.photoURL)
        fetch("http://localhost:5000/forumpost")
            .then((res) => {
                return(res.json())
            })
            .then((obj) => {
                setPosts(obj);
            });
    }, [])

    const display = <div style = {{paddingBottom: "5%"}}>
        <h1 style = {{textAlign: "center", padding:"15px"}}>Hear from the fans!</h1>
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