import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import { FaThumbsUp } from 'react-icons/fa';
import { FaThumbsDown } from 'react-icons/fa';

export default function PostCard({postContent}){
    const isLoggedIn = true;
    const history = useHistory();
    const l = postContent.likes;
    const d = postContent.dislikes;
    const [readMore,setReadMore] = useState(false);
    const [likes, setLikes] = useState(Object.keys(l).length)
    const [dislikes, setDislikes] = useState(Object.keys(d).length);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    console.log(postContent.likes)

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
    
    const likeEdit = (here, other) => {
        const id = here.id
        const name = here.name

        if((id === "like" && !liked) || (id === "dislike" && !disliked)) {//(name === "inactive") {
            // here.name = "active"
            if(id === "like") {
                here.style.color = "#66c144";
                setLikes(likes + 1);
                setLiked(true);
                if(disliked) {
                    setDislikes(dislikes - 1);
                    setDisliked(false);
                    other.style.color = "#003366";
                }
            }
            else {
                here.style.color = "#e31f0e"
                setDislikes(dislikes + 1)
                setDisliked(true);
                if(liked) {
                    setLikes(likes - 1);
                    setLiked(false);
                    other.style.color = "#003366";
                }
            }
            // if(other.name === "active")
            // {
            //     id === "like" ? setDislikes(dislikes - 1) : setLikes(likes - 1);
            //     other.name = "inactive";
            //     other.style.color = "#003366";
            // }
        }
        else {
            // here.name = "inactive"
            here.style.color = "#003366";
            if(id === "like") {
                setLikes(likes - 1);
                setLiked(false);
            }
            else {
                setDislikes(dislikes - 1);
                setDisliked(false);
            }
            // id === "like" ? setLikes(likes - 1) : setDislikes(dislikes - 1);
        }
    }

    const onClick = (e) => {
        const id = e.currentTarget.id
        const name = e.currentTarget.name;
        let other;
        // console.log(id);
        // const here = document.getElementById(id);
        const here = e;
        name === "like" ? 
            other = document.getElementById(`d${id}`) 
            : 
            other = document.getElementById(id.substring(1))


        if((name === "like" && !liked) || (name === "dislike" && !disliked)) {//(name === "inactive") {
            // here.currentTarget.name = "active"
            if(name === "like") {
                here.currentTarget.style.color = "#66c144";
                setLikes(likes + 1);
                setLiked(true);
                if(disliked) {
                    setDislikes(dislikes - 1);
                    setDisliked(false);
                    other.style.color = "#003366"
                }
            }
            else {
                here.currentTarget.style.color = "#e31f0e"
                setDislikes(dislikes + 1)
                setDisliked(true);
                if(liked) {
                    setLikes(likes - 1);
                    setLiked(false);
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
                setLikes(likes - 1);
                setLiked(false);
            }
            else {
                setDislikes(dislikes - 1);
                setDisliked(false);
            }
            // id === "like" ? setLikes(likes - 1) : setDislikes(dislikes - 1);
        }


        // likeEdit(here, other);
    }

    const likeBut = <button type = "button" id={postContent.id} name="like" onClick = {onClick} class="btn btn-link" style={{color:"#003366"}} writable = {true}>
        <FaThumbsUp size={20} />
    </button>

    const disBut = <button type ="button" id = {`d${postContent.id}`} name = "dislike" onClick = {onClick} class="btn btn-link" style={{color:"#003366"}} writable = {true}>
        <FaThumbsDown size={20}/>
    </button>


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