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
    const [posts,setPosts] = useState(null);
    const history = useHistory();
    const {user} = useContext(UserContext);
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

    // Initial loading of all the posts in the database. Sorts by recent update date -> post date
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
            <div style={{display:"flex",marginLeft:"14%",marginBottom:"-30px"}}>
            <h1 style={{textAlign:"left",padding:"15px",fontSize:"80px"}}>BLOG.</h1>
            <div style={{paddingTop:"30px",paddingLeft:"43vw"}}>
            {user&&user.is_admin&&
            <div style={{paddingLeft:105}}>
                <Button style={{height:50,backgroundColor:"#4C6357",border:"none"}} onClick={(e)=>{
            history.push("/newpost");
            e.stopPropagation();
            }}>New Post</Button></div>}
            <Form.Control style={{marginTop:(user&&user.is_admin?10:55),width:200,}}name='value' value={search} onChange={(event) => { setSearch(event.target.value) }} onKeyPress={(evt) => {
                    searchPosts();
                }} placeholder={'Search by Title'} />
            </div>
            </div>
            <div style={{height:15,width:240,marginLeft:"15%",backgroundColor:"#4C6357",marginBottom:"2%"}}></div>
            {posts?(postsToDisplay.map((post)=>{return(<PostCard postContent={post}/>)})):(
            <div class="center">
            <Spinner animation="grow"/>           
            </div>)}

        </div>
    )

}