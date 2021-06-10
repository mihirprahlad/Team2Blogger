import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useState,useContext} from 'react';
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import { FaThumbsUp } from 'react-icons/fa';
import { FaThumbsDown } from 'react-icons/fa';
import { UserContext } from '../../contexts/UserContext';

export default function PostCard({postContent}){
    const {user} = useContext(UserContext)
    const history = useHistory();

    const [readMore,setReadMore] = useState(false);

    const reduceContentLength = ((content)=>{
    content = content.replace(/<[^>]*>?/gm, '');
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

    function checkURL(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }



    return(
        <div style={{paddingBottom:"3%"}}>
            <Card style={{ width: '70vw' , height:'auto', margin:"auto"}}>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col md={2}>
                                <Image style={{ width: '5rem'}} src="https://drive.google.com/thumbnail?id=1wJ0SlPBrq0AQp10LzpcdjqJIijQndLnT" roundedCircle/>
                            </Col>
                            <Col md={8} style={{paddingLeft:"3%"}}>
                                <h2 style={{fontWeight:"bold"}}>{postContent.title}</h2>
                                <Card.Subtitle className="mb-2 text-muted">Camille Cooper</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{postContent.date}</Card.Subtitle>
                                {postContent.editDate!==""&&<Card.Subtitle style={{fontStyle:"italic"}} className="mb-2 text-muted">Updated: {postContent.editDate}</Card.Subtitle>}
                            </Col>
                            <Col md={2}>
                                {user&&
                                <div>
                                <button type="button" class="btn btn-link" >
                                    <FaThumbsUp size={20} style={{color:"#003366"}}/>
                                </button>
                                <button type="button" class="btn btn-link">
                                    <FaThumbsDown size={20} style={{color:"#003366"}}/>
                                </button>
                                </div>
                                }
                                <Card.Subtitle style={{fontSize:"14px",margin:"auto", textAlign:"justify",paddingTop:7}}>Likes: 300</Card.Subtitle>
                                <Card.Subtitle style={{fontSize:"14px",margin:"auto", textAlign:"justify",paddingTop:7}}>Dislikes: 300</Card.Subtitle>
                            </Col>
                        </Row>
                    {checkURL(postContent.image)&&<div><Row style={{justifyContent:"center"}}>
                        <Image class="img-fluid" style={{ maxWidth: '60vw',height:"330px"}} src={postContent.image}/>
                    </Row></div>}
                    <Row>
                        <p style={{textAlign:"center",paddingTop:"2%",fontSize:15,marginLeft:"3%",marginRight:"3%"}}>{reduceContentLength(postContent.content)}</p>
                    </Row>
                    <Row style={{justifyContent:"center",paddingTop:"10px"}}>
                        <Button style={{backgroundColor:"#4C6357",border:"none"}} onClick={(e)=>{
                            history.push("/blogpost/"+postContent.id);
                            e.stopPropagation();
                        }}>{postContent.content.length>=700?"Read More":"Go To Post"}</Button>
                    </Row>
                    </Container>
                </Card.Body>
            </Card>
            
        </div>
    )

}