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
    content = content.replace(/<[^>]*>?/gm, '');
    let displayContent = "";
    // if(content.length<=700){
    //     return content;
    // }
    // else{
    // for(let x=0;x<=100;x++){
    //     displayContent = displayContent+content.charAt(x);
    // }
    //     return displayContent+"..."
    // } 
    });

    function checkURL(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }



    return(
        <div style={{paddingBottom:"3%"}}>
            <Card style={{ width: '45vw' , height:'auto', margin:"10px"}}>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col md={2}>
                                {/* <Image style={{ width: '5rem'}} src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id474001958?s=170x170" roundedCircle/> */}
                            </Col>
                            <Col md={8} style={{paddingLeft:"3%"}}>
                                <h2 style={{fontWeight:"bold", fontSize:17, justifyContent:"center", alignContent:"center"}}>{postContent.title}</h2>
                                {/* <Card.Subtitle className="mb-2 text-muted">Camille Cooper</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{postContent.date}</Card.Subtitle>
                                {postContent.editDate!==""&&<Card.Subtitle style={{fontStyle:"italic"}} className="mb-2 text-muted">Updated: {postContent.editDate}</Card.Subtitle>} */}
                            </Col>
                            {/* <Col md={2}>
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
                            </Col> */}
                        </Row>
                    {checkURL(postContent.image)&&<div><Row style={{justifyContent:"center"}}>
                        <Image class="img-fluid" style={{ maxWidth: '40vw',height:"250px"}} src={postContent.image}/>
                    </Row></div>}
                    <Row>
                        <p style={{textAlign:"left",paddingTop:"2%",fontSize:15}}>{reduceContentLength(postContent.content)}</p>
                    </Row>
                    <Row style={{justifyContent:"center",paddingTop:"10px"}}>
                        <Button style={{backgroundColor:"#4C6357",border:"none"}} onClick={(e)=>{
                            history.push("/blogpost/"+postContent.id);
                            e.stopPropagation();
                        }}>{postContent.content.length>=700?"Go To Post":"Go To Post"}</Button>
                    </Row>
                    </Container>
                </Card.Body>
            </Card>
            
        </div>
    )

}