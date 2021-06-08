import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../../App.css'
import Spinner from 'react-bootstrap/Spinner'

export default function BlogPost(){
    const {blogID} = useParams();
    const [content,setContent] = useState(null);

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

    return(
        <div style={{marginLeft:"17%",marginRight:"17%",marginTop:"28px",marginBottom:"100px"}}>
            {content?
            (<div>
            <Row>
                <Col sm={10}>
                    <h1>{content.title}</h1>
                    <h4>Camille Cooper</h4>
                    <h6>{content.date}</h6>
                </Col>
                <Col sm={2}>
                    <Image style={{ width: '5rem'}} src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id474001958?s=170x170" roundedCircle/>
                </Col>
            </Row>
            <Row style={{justifyContent:"center",marginBottom:"15px",marginTop:"5px"}}>
                <Image style={{ maxWidth: '50rem',maxHeight:"20rem"}} src={content.image}/>
            </Row>
            <p>{content.content}</p>
            </div>):(<div class="center">
            <Spinner animation="grow"/>
            </div>)
            }
        </div>
    )

}