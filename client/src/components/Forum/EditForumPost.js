import React,{useState,useEffect,useContext} from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import {useQuill} from  'react-quilljs'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { useHistory,useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext.js";

export default function EditForumPost(){

    const isLoggedIn = true;
    const isAdmin = true;
    const history = useHistory();
    const {blogID} = useParams();
    const [content,setContent] = useState(null);
    const [newPostTitle,setNewPostTitle] = useState("");
    const [newPostImage,setNewPostImage] = useState("");
    const { quill, quillRef } = useQuill();
    const [firstRun,setFirstRun] = useState(true);
    const { user } = useContext(UserContext);


    useEffect(() => {
        fetch("http://localhost:5000/forumpost")
            .then((res) => {
                return(res.json())
            })
            .then((res) => {
                res.forEach((res) => {
                    if(res.id === blogID) {
                        console.log(res);
                        setContent(res);
                    }
                })
            })
        
    }, [])

    useEffect(() => {
        if(firstRun && content){
            console.log("activated")
            setNewPostTitle(content.title);
            setNewPostImage(content.image);
            setFirstRun(false)
        }
    })

    const saveChanges=(() => {
        const title = newPostTitle;
        const editDate = Date().toLocaleString()
        const image = newPostImage;
        const content = quill.container.firstChild.innerHTML
        console.log(JSON.stringify({title,editDate,image,content}))
        console.log(blogID)
        fetch("http://localhost:5000/blogpost/" + blogID, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({title,editDate,image,content})
          })
        .then(()=>{history.push("/blogpost/"+blogID);})
    })

    const deletePost=(()=>{
        fetch("http://localhost:5000/blogpost/"+blogID, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          })
        .then(()=>{history.push("/blog");})
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
        <div style={{height:200,width:"auto",marginBottom:"5%",backgroundColor:"white"}}>
        <div style={{backgroundColor:"white"}} ref={quillRef} ></div>
        </div>
        <div>
        {user&&
        <div>
        <Button onClick={()=>{saveChanges();}}style={{marginRight:"5px"}}>Publish Changes</Button>
        <Button onClick={()=>{deletePost();}}>Delete Post</Button>
        </div>
        }
        </div>
    </div>
    )


}
