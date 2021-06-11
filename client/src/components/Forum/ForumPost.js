import React,{useState,useEffect, useContext} from "react";
import {useParams, useHistory} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../../App.css'
import Spinner from 'react-bootstrap/Spinner'
import { FaThumbsUp } from 'react-icons/fa';
import { FaThumbsDown } from 'react-icons/fa';
import { UserContext } from "../../contexts/UserContext";
import SignIn from "./../SignIn"
import Button from 'react-bootstrap/Button';
import Comments from "../Comments/Comments";
import moment from 'moment';

export default function ForumPost() {
    const history = useHistory();
    const isLoggedIn = true;
    const {forumID} = useParams();
    const [content, setContent] = useState(null);
    const {user} = useContext(UserContext);
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0);

    if(content){
        console.log((content&&user&&(user.id===content.user.id))||(content&&user&&user.is_admin))
    }

    useEffect(() => {
        fetch("http://localhost:5000/forumpost")
            .then((res) => {
                return(res.json())
            })
            .then((obj) => {
                obj.forEach((post)=>{
                    if(post.id===forumID){
                        setContent(post);

                    }

                })
            })
    },[])

    const likeEdit = (here, other) => {
        const id = here.id
        const name = here.name

        if(name === "inactive") {
            here.name = "active"
            if(id === "like") {
                here.style.color = "#66c144";
                setLikes(likes + 1);
            }
            else {
                here.style.color = "#e31f0e"
                setDislikes(dislikes + 1)
            }
            if(other.name === "active")
            {
                id === "like" ? setDislikes(dislikes - 1) : setLikes(likes - 1);
                other.name = "inactive";
                other.style.color = "rgb(119, 158, 203)";
            }
        }
        else {
            here.name = "inactive"
            here.style.color = "rgb(119, 158, 203)";
            id === "like" ? setLikes(likes - 1) : setDislikes(dislikes - 1);
        }
    }

    const onClick = (e) => {
        const id = e.currentTarget.id
        let other;
        const here = document.getElementById(id);
        id === "like" ? 
            other = document.getElementById("dislike") 
            : 
            other = document.getElementById("like")

        likeEdit(here, other);
    }

    const likeBut = <button id="like" name="inactive" onClick = {onClick} className="btn btn-link" style={{color:"#779ecb"}}>
        <FaThumbsUp size={20} />
    </button>

    const disBut = <button id = "dislike" name = "inactive" onClick = {onClick} className="btn btn-link" style={{color:"#779ecb"}}>
        <FaThumbsDown size={20}/>
    </button>


    const display = <div style={{marginLeft:"17%",marginRight:"17%",marginTop:"28px",marginBottom:"100px"}}>
        {user ? 
            content ?
                (<div>
                    <div style={{right:"1%",top:"10%",position:"absolute"}}>
                    {((content&&user&&(user.id===content.user.id))||(content&&user&&user.is_admin))?<Button style={{width:"5rem",marginBottom:"3px",backgroundColor:"#4C6357",border:"none"}}onClick={(e)=>{history.push("/editforumpost/"+content.id);
                                    e.stopPropagation();}}>Edit</Button>:<div></div>}
                    </div>
                    <Row>
                        <Col sm={10}>
                            <h1 style={{fontWeight:"bold"}}>{content.title}</h1>
                            <h4>{content.user.name}</h4>
                            <h6>{moment(content.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</h6>
                            {content.editDate!==""&&<h6>{moment(content.editDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</h6>}
                        </Col>
                        <Col sm={2}>
                            <Image style={{ width: '5rem'}} src={content.user.pic} roundedCircle/>
                            {isLoggedIn &&
                                <div>
                                    {likeBut}
                                    {disBut}
                                </div>
                            }
                            <p style={{fontSize:"12px", paddingTop:5}}>Likes: {likes} Dislikes: {dislikes}</p>
                        </Col>
                    </Row>
                    <Row style={{justifyContent:"center",marginBottom:"15px",marginTop:"5px"}}>
                        <Image style={{ maxWidth: '50rem',maxHeight:"20rem"}} src={content.image}/>
                    </Row>
                    <div dangerouslySetInnerHTML={{ __html:content.content}} />
                    {Comments(history.location.pathname, forumID, content.title)}
                </div>)
                :
                (<div className="center">
                        <Spinner animation="grow"/>
                </div>)
            :
            <div className = "text-center">
                <h3 style = {{padding:"15px"}}>You must log in to view forum posts!</h3>
                <SignIn/>
            </div>
        }
    </div>
            
    return(
        display
    )

}