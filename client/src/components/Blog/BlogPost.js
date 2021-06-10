import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../../App.css'
import Spinner from 'react-bootstrap/Spinner'
import { FaThumbsUp } from 'react-icons/fa';
import { FaThumbsDown } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import {useQuill} from  'react-quilljs'
import { useHistory } from "react-router-dom";

export default function BlogPost(){
    const history = useHistory();
    const isLoggedIn = true;
    const isAdmin = true;
    const {blogID} = useParams();
    const [content,setContent] = useState(null);
    const [edit,setEdit] = useState(false);

    useEffect(()=>{
        fetch("http://localhost:5000/blogpost")
            .then((res) => res.json())
            .then((res) => {
                res.forEach((res)=>{
                    if(res.id===blogID){
                        console.log(res)
                        setContent(res);

                    }

                })
            })
    },[])
    

    function checkURL(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }


    return(
        <div>
            {isAdmin&&
            <div style={{right:"1%",top:"10%",position:"absolute"}}>
                <Button style={{width:"5rem",marginBottom:"3px"}}onClick={(e)=>{history.push("/editpost/"+content.id);
                            e.stopPropagation();}}>Edit</Button>
            </div>}
            {content?
            (<div style={{marginLeft:"17%",marginRight:"17%",marginTop:"28px",marginBottom:"100px"}}>
            <Row>
                <Col sm={10}>
                    <h1 style={{fontWeight:"bold"}}>{content.title}</h1>
                    <h4>Camille Cooper</h4>
                    <h6>{content.date}</h6>
                    {content.editDate&&<h6 style={{fontStyle:"italic"}}>Updated: {content.editDate}</h6>}
                </Col>
                <Col sm={2}>
                    <Image style={{ width: '5rem'}} src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id474001958?s=170x170" roundedCircle/>
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
                                <p style={{fontSize:"12px", paddingTop:5}}>Likes: 300 Dislikes: 25</p>
                </Col>
            </Row>
            {checkURL(content.image)&&<Row style={{justifyContent:"center",marginBottom:"15px",marginTop:"5px"}}>
                <Image style={{ maxWidth: '50rem',maxHeight:"20rem"}} src={content.image}/>
            </Row>}
            <div dangerouslySetInnerHTML={{ __html:content.content}} />
            </div>)
            :
            (<div class="center">
            <Spinner animation="grow"/>
            </div>)
        }
        </div>
    )

}