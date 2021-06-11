import React,{useState,useEffect, useContext} from "react";
import {useParams, useHistory} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../../App.css'
import Spinner from 'react-bootstrap/Spinner'
import Likes from "./Likes.js";
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
                            <Likes
                              postId={content.id}
                              initialLikes={content.likes}
                              initialDislikes={content.dislikes}
                            />
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
