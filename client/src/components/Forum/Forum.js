import React, {useContext, useEffect, useState} from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import PostCard from "./PostCard"
import {UserContext} from "./../../contexts/UserContext"
import SignIn from "./../SignIn"
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form'


export default function Forum() {
    const [posts, setPosts] = useState(null);
    const {user} = useContext(UserContext);
    const history = useHistory();
    const [search,setSearch] = useState("");

    //  Filters results based on search.
    const searchPosts = () => {
        if (posts === null) return []
        let newPosts = posts;
        newPosts = newPosts.filter((post) => {
        const title = post.title.toUpperCase();
        const searchWord = search.toUpperCase();
        return title.indexOf(searchWord) !== -1 || searchWord === "";
        });
        return newPosts;
    };

    // What's being displayed is always technically the search results.
    const postsToDisplay = searchPosts();

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
        <div style={{display:"flex",marginLeft:"15%",marginBottom:"-15px",paddingTop:"20px"}}>
        <h1 style={{textAlign:"left",fontSize:"80px"}}>FORUM.</h1>
             <div style={{paddingLeft:"54%",paddingTop:"20px"}}>
             {user && 
             <div>
             <Button style={{height:50,backgroundColor:"#4C6357",border:"none"}} onClick={(e) => {
                    history.push("/newforumpost");
                    e.stopPropagation();
                }}>
                    New Post
                </Button>
                 <Form.Control style={{marginTop:10,marginLeft:-90,width:185}}name='value' value={search} onChange={(event) => { setSearch(event.target.value) }} onKeyPress={(evt) => {
                    searchPosts();
                }} placeholder={'Search by Title'} />
                </div>}
            </div>
        </div>
        <div style={{height:15,width:310,marginLeft:"15%",backgroundColor:"#4C6357",marginBottom:"2%"}}></div>
        {user ?
            posts ? 
                postsToDisplay.map((post) => {
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