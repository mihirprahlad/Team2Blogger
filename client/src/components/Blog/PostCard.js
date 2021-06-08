import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

export default function PostCard({postContent}){
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
        <div>
            <Card style={{ width: '50vw' , height:'400px', margin:"auto"}}>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col sm={2}>
                                <Image style={{ width: '5rem'}} src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id474001958?s=170x170" roundedCircle/>
                            </Col>
                            <Col sm={10}>
                                <h2>{postContent.title}</h2>
                                <Card.Subtitle className="mb-2 text-muted">Camille Cooper</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{postContent.date}</Card.Subtitle>
                            </Col>
                        </Row>
                    <Row>
                    <Card.Text style={{textAlign:"left",paddingTop:"2%"}}>{reduceContentLength(postContent.content)}</Card.Text>
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