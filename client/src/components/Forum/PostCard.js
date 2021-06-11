import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Likes from "./Likes.js";
import moment from 'moment';

export default function PostCard({postContent}){
  const {user} = useContext(UserContext);
    const history = useHistory();
    const [readMore,setReadMore] = useState(false);

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
                                <Image style={{ width: '5rem'}} src={postContent.user.pic} roundedCircle/>
                            </Col>
                            <Col md={8} style={{paddingLeft:"3%"}}>
                                <h2 style={{fontWeight:"bold"}}>{postContent.title}</h2>
                                <Card.Subtitle className="mb-2 text-muted">{postContent.user.name}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{moment(postContent.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Card.Subtitle>
                                {postContent.editDate !== "" && <Card.Subtitle style = {{fontStyle:"italic"}} className="mb-2 text-muted">Updated: {moment(postContent.editDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Card.Subtitle>}
                            </Col>
                            <Col md={2}>
                              <Likes
                                postId={postContent.id}
                                initialLikes={postContent.likes}
                                initialDislikes={postContent.dislikes}
                              />
                            </Col>
                        </Row>
                    {postContent.image !== "" && <div><Row style={{justifyContent:"center"}}>
                        <Image class="img-fluid" style={{ maxWidth: '60vw',height:"330px"}} src={postContent.image}/>
                    </Row></div>}
                    <Row>
                        <p style={{textAlign:"left",paddingTop:"2%",fontSize:15}}>{reduceContentLength(postContent.content)}</p>
                    </Row>
                    <Row style={{justifyContent:"center",paddingTop:"10px"}}>
                        <Button style={{backgroundColor:"#4C6357",border:"none"}} onClick={(e)=>{
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
