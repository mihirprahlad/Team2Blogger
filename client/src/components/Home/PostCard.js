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
    const reduceContentLength = ((content)=>{
    content = content.replace(/<[^>]*>?/gm, '');
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
                            </Col>
                            <Col md={8} style={{paddingLeft:"3%"}}>
                                <h2 style={{fontWeight:"bold", fontSize:17, justifyContent:"center", alignContent:"center"}}>{postContent.title}</h2>
                            </Col>
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