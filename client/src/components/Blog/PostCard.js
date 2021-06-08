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

    const [readMore,setReadMore] = useState(false);

    const reduceContentLength = ((content)=>{
    let displayContent = "";
    if(content.length<=700){
        return content;
    }
    else{
    for(let x=0;x<=700;x++){
        displayContent = displayContent+content.charAt(x);
    }
        return displayContent+"..."
    } 
    });



    return(
        <div style={{paddingBottom:"3%"}}>
            <Card style={{ width: '70vw' , height:'auto', margin:"auto"}}>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col md={2}>
                                <Image style={{ width: '5rem'}} src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id474001958?s=170x170" roundedCircle/>
                            </Col>
                            <Col md={8} style={{paddingLeft:"3%"}}>
                                <h2 style={{fontWeight:"bold"}}>{postContent.title}</h2>
                                <Card.Subtitle className="mb-2 text-muted">Camille Cooper</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{postContent.date}</Card.Subtitle>
                            </Col>
                            <Col md={2}>
                                {isLoggedIn&&
                                <div>
                                <button type="button" class="btn btn-link" >
                                    <FaThumbsUp size={20} style={{color:"#779ecb"}}/>
                                </button>
                                <button type="button" class="btn btn-link">
                                    <FaThumbsDown size={20} style={{color:"#779ecb"}}/>
                                </button>
                                </div>
                                }
                                <Card.Subtitle style={{fontSize:"12px",margin:"auto", textAlign:"justify",paddingTop:7}}>Likes: 300</Card.Subtitle>
                                <Card.Subtitle style={{fontSize:"12px",margin:"auto", textAlign:"justify",paddingTop:7}}>Dislikes: 300</Card.Subtitle>
                            </Col>
                        </Row>
                    <Row style={{justifyContent:"center"}}>
                        <Image class="img-fluid" style={{ maxWidth: '60vw',height:"330px"}} src={postContent.image}/>
                    </Row>
                    <Row>
                        <p style={{textAlign:"left",paddingTop:"2%",fontSize:15}}>{reduceContentLength(postContent.content)}</p>
                    </Row>
                    <Row style={{justifyContent:"center",paddingTop:"10px"}}>
                        <Button variant="success" onClick={(e)=>{
                            history.push("/blogpost/"+postContent.id);
                            e.stopPropagation();
                        }}>{postContent.content.length>=700?"Read More":"Read"}</Button>
                    </Row>
                    </Container>
                </Card.Body>
            </Card>
            
        </div>
    )

}