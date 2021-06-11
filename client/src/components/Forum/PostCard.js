import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import { FaThumbsUp } from 'react-icons/fa';
import { FaThumbsDown } from 'react-icons/fa';
import { UserContext } from "../../contexts/UserContext";
import moment from 'moment';
import axios from "axios";

export default function PostCard({postContent}){
    const isLoggedIn = true;
    const history = useHistory();
    const l = postContent.likes;
    const d = postContent.dislikes;
    const [likes, setLikes] = useState(Object.keys(l).length)
    const [dislikes, setDislikes] = useState(Object.keys(d).length);
    // const [liked, setLiked] = useState(false);
    let liked = false;
    // const [disliked, setDisliked] = useState(false);
    let disliked = false;
    const {user} = useContext(UserContext);
    const [likeBut, setLikeBut] = useState(null);
    const [disBut, setDisBut] = useState(null);
    const userid = user.id;
    let userLikes = Object.keys(user.forum_likes);
    let userDislikes = Object.keys(user.forum_dislikes);

    const reduceContentLength = ((content) => {
        content = content.replace(/<[^>]*>?/gm, '');
        let displayContent = "";
        if(content.length<=700) {
            return content;
        }
        else {
            for(let x=0;x<=700;x++) {
                displayContent = displayContent+content.charAt(x);
            }
            return displayContent+"..."
        } 
    });
    
        // function checkURL(url) {
        //     return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
        // }
    

    const onClick = (e) => {
        const id = e.currentTarget.id
        const name = e.currentTarget.name;
        const i = postContent.id;
        console.log("Start user likes:", userLikes);
        console.log("Start user dislikes:",userDislikes)
        console.log("Start user", user)
        if(userLikes.includes(i)) {
            console.log("liked")
            liked = true;
        //     disliked = false;
        //     setLiked(true);
        }
        if(userDislikes.includes(i)) {
            disliked = true;
            liked = false;
            // setDisliked(true);
        }
        console.log(id, "\nliked:", liked, "\ndisliked:", disliked)
        let other;
        const here = e;
        name === "like" ? 
            other = document.getElementById(`d${i}`) 
            : 
            other = document.getElementById(i)

        if((name === "like" && !liked) || (name === "dislike" && !disliked)) {//(name === "inactive") {
            if(name === "like") {
                here.currentTarget.style.color = "#66c144";
                // setLikes(likes + 1);
                axios
                    .post(`http://localhost:5000/forumpost/${i}/likes`, {user_id: userid, action: "like"})
                    .then((res) => {
                        setLikes(res.data.likes);
                        setDislikes(res.data.dislikes);
                    })
                // fetch(`http://localhost:5000/forumpost/${i}/likes`, {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify({user_id: userid, action: "like"})
                //   })
                // setLiked(true);
                liked = true;
                if(disliked) {
                    setDislikes(dislikes - 1);
                    console.log(delete user.forum_dislikes[id])
                    console.log("End user:", user)
                    userDislikes = Object.keys(user.forum_dislikes)
                    console.log("End user dislikes:",userDislikes);
                    // setDisliked(false);
                    disliked = false;
                    other.style.color = "#003366"
                }
            }
            else {
                here.currentTarget.style.color = "#e31f0e"
                setDislikes(dislikes + 1);
                axios
                .post(`http://localhost:5000/forumpost/${i}/likes`, {user_id: userid, action: "like"})
                .then((res) => {
                    setLikes(res.data.likes);
                    setDislikes(res.data.dislikes);
                })

                // fetch(`http://localhost:5000/forumpost/${i}/likes`, {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify({user_id: userid, action: "dislike"})
                //   })
                // setDisliked(true);
                disliked = true;
                if(liked) {
                    console.log("here");
                    // setLikes(likes - 1);
                    console.log(delete user.forum_likes[id])
                    console.log("End user:", user)
                    userLikes = Object.keys(user.forum_likes)
                    console.log("End user likes:",userLikes)
                    liked = false;
                    // setLiked(false);
                    other.style.color = "#003366";
                }
            }
            // if(other.name === "active") {
            //     id === "like" ? setDislikes(dislikes - 1) : setLikes(likes - 1);
            //     other.name = "inactive";
            //     other.style.color = "#003366";
            //     console.log("here")
            // }
        }
        else {
            // here.currentTarget.name = "inactive"
            here.currentTarget.style.color = "#003366";
            if(name === "like") {
                // setLikes(likes - 1);
                console.log(delete user.forum_likes[id]);
                axios
                    .delete(`http://localhost:5000/forumpost/${i}/likes`, {
                        data: {user_id: userid, action: "like"}
                    })
                    .then((res) => {
                        setLikes(res.data.likes);
                        setDislikes(res.data.dislikes);
                    })
                // fetch(`http://localhost:5000/forumpost/${i}/likes`, {
                //     method: "DELETE",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify({user_id: userid, action: "like"})
                //   })
                // setLiked(false);
                liked = false;
            }
            else {
                // setDislikes(dislikes - 1);
                console.log(delete user.forum_dislikes[id])
                axios
                    .delete(`http://localhost:5000/forumpost/${i}/likes`, {
                        data: {user_id: userid, action: "like"}
                    })
                    .then((res) => {
                        setLikes(res.data.likes);
                        setDislikes(res.data.dislikes);
                    })

                // fetch(`http://localhost:5000/forumpost/${i}/likes`, {
                //     method: "DELETE",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify({user_id: userid, action: "dislike"})
                //   })

                // setDisliked(false);
                disliked = false;
            }
            // id === "like" ? setLikes(likes - 1) : setDislikes(dislikes - 1);
        }
    }

    const setButtonColor = (n, i) => {
        let o;
        let color = "#003366"
        n === "like" ? 
            o = Object.keys(user.forum_likes) 
            : 
            o = Object.keys(user.forum_dislikes)
            
        o.forEach(id => {
             if(id === i) {
                if(n === "like") {
                    color = "#66c144";
                    // setLiked(true);
                }
                else {
                    color = "#e31f0e";
                    // setDisliked(true);
                }
            }
        });
        return(color)
    }

    useEffect(() => {
        let color = setButtonColor("like", postContent.id)
        console.log(color);
        // if(userLikes.includes(postContent.id))
        //     setLiked(true);
        // if(userDislikes.includes(postContent.id))
        //     setDisliked(true);
        setLikeBut(<button type = "button" id={postContent.id} name="like" onClick = {onClick} class="btn btn-link" style={{color:color}}>
            <FaThumbsUp size={20} />
        </button>)
        color = setButtonColor("dislike", postContent.id)
        // console.log(color)
        setDisBut(<button type ="button" id = {`d${postContent.id}`} name = "dislike" onClick = {onClick} class="btn btn-link" style={{color:color}}>
            <FaThumbsDown size={20}/>
        </button>)
    }, [])


    return(
        <div style={{paddingBottom:"3%"}}>
            <Card style={{ width: '70vw' , height:'auto', margin:"auto"}}>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col md={2}>
                                <Image style={{ width: '5rem'}} src={postContent.user.pic} roundedCircle/>
                            </Col>
                            <Col md={8} style={{paddingLeft:"3%"}}>
                                <h2 style={{fontWeight:"bold"}}>{postContent.title}</h2>
                                <Card.Subtitle className="mb-2 text-muted">{postContent.user.name}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{postContent.date}</Card.Subtitle>
                                {postContent.editDate !== "" && <Card.Subtitle style = {{fontStyle:"italic"}} className="mb-2 text-muted">Updated: {postContent.editDate}</Card.Subtitle>}
                            </Col>
                            <Col md={2}>
                                {isLoggedIn&&
                                <div>
                                    {likeBut}
                                    {disBut}
                                </div>
                                }
                                <Card.Subtitle style={{fontSize:"12px",margin:"auto", textAlign:"justify",paddingTop:7}}>Likes: {likes}</Card.Subtitle>
                                <Card.Subtitle style={{fontSize:"12px",margin:"auto", textAlign:"justify",paddingTop:7}}>Dislikes: {dislikes}</Card.Subtitle>
                            </Col>
                        </Row>
                    {postContent.image !== "" && <div><Row style={{justifyContent:"center"}}>
                        <Image class="img-fluid" style={{ maxWidth: '60vw',height:"330px"}} src={postContent.image}/>
                    </Row></div>}
                    <Row>
                        <p style={{textAlign:"left",paddingTop:"2%",fontSize:15}}>{reduceContentLength(postContent.content)}</p>
                    </Row>
                    <Row style={{justifyContent:"center",paddingTop:"10px"}}>
                        <Button variant="success" onClick={(e)=>{
                            history.push("/forumpost/"+postContent.id);
                            e.stopPropagation();
                        }}>{postContent.content.length>=700?"Read More":"Read"}</Button>
                    </Row>
                    </Container>
                </Card.Body>
            </Card>
            
        </div>
    )

}