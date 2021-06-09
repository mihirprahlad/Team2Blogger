import React,{useState,useEffect} from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import {useQuill} from  'react-quilljs'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { useHistory,useParams } from "react-router-dom";

export default function EditPost(){

    const isLoggedIn = true;
    const isAdmin = true;
    const history = useHistory();
    const {blogID} = useParams();
    const [content,setContent] = useState(null);
    const [newPostTitle,setNewPostTitle] = useState("");
    const [newPostImage,setNewPostImage] = useState("");
    const { quill, quillRef } = useQuill();
    const [firstRun,setFirstRun] = useState(true);


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

    useEffect(()=>{
        if(firstRun&&content){
            console.log("activated")
            setNewPostTitle(content.title);
            setNewPostImage(content.image);
            setFirstRun(false)
        }
    })

    const saveChanges=(()=>{
        const title = newPostTitle;
        const date = Date().toLocaleString()
        const image = newPostImage;
        const content = quill.container.firstChild.innerHTML
        console.log(JSON.stringify({title,date,image,content}))
        console.log(blogID)
        fetch("http://localhost:5000/blogpost/"+blogID, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({title,date,image,content})
          })
        .then(()=>{history.push("/blogpost/"+blogID);})
    })

    if(content&&quill){
        if(content.content){
        quill.root.innerHTML  = content.content
        }
    }


    return(
        <div style={{marginLeft:50,marginRight:50,marginBottom:100}}>
        {content&&
        <div>
        <Form style={{marginTop:"30px"}}>
        <h1>Edit Post.</h1>
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control defaultValue={content.title} onChange={(evt)=>setNewPostTitle(evt.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Picture</Form.Label>
                <Form.Control defaultValue={content.image} onChange={(evt)=>setNewPostImage(evt.target.value)}></Form.Control>
            </Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Group className="mb-3" controlId="formContent">
            </Form.Group>
        </Form>
        </div>
        }
        <div style={{height:200,width:"auto",marginBottom:"5%"}}>
        <div ref={quillRef} ></div>
        </div>
        <div>
        <Button onClick={()=>{saveChanges();}}style={{marginRight:"5px"}}>Publish Changes</Button>
        <Button >Delete Post</Button>
        </div>
    </div>
    )


}
