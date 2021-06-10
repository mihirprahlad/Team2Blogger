import React, {useEffect, useState} from "react";
import LazyHero from 'react-lazy-hero';
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import PostCard from './PostCard';
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

const titleStyle = {
    fontSize: "12rem",
    color:"#4C6357",
    fontWeight:900



};
document.body.style='background:#FAF0E6;';
const aboutTextStyle = {
    fontSize: 20
};


export default function Home() {
    const history = useHistory();
    const [posts,setPosts] = useState(null);
    useEffect(()=>{
        fetch("http://localhost:5000/blogpost")
            .then((res) => res.json())
            .then((res) => setPosts(res))
    },[])
    console.log(posts)
    return (
        <div >
                <LazyHero imageSrc="https://wallpaperaccess.com/full/647493.jpg" style={{height:"300px"}}opacity={0.35} parallaxOffset={150}>
                    <h1 style={titleStyle}>C A M I L L E</h1>
                </LazyHero>
                <div style={{marginLeft:"5%",paddingTop:"4vh",marginRight:"5%"}}>
                <h1 style={{textAlign:"left",fontSize:"50px",color:"#4C635"}}>Featured Posts.</h1>
                <div style={{height:15,width:380,backgroundColor:"#4C6357"}}></div>
                <div style={{marginTop:20, display:"flex", flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
                    {posts?(posts.slice(0,1).concat(posts.slice(2,3)).map((post)=>{return(<PostCard postContent={post}/>)})):(
                    <div class="center">
                    <Spinner animation="grow"/>           
                    </div>)}
                </div>
                <h1 style={{textAlign:"left",fontSize:"50px",color:"#4C635"}}>Our History.</h1>
                <div style={{height:15,width:300,backgroundColor:"#4C6357"}}></div>
                <div style={{marginBottom:20,marginTop:30}}>
                    <p style={{fontSize:20}}>Camille's Corner started back in the summer of 2019 when Camille first moved to NYC for an internship. Sitting behind a screen all day in the middle of a giant concrete jungle made her long for the proper outdoors. Hopelessly stuck between being drawn to the culture of cities and the allure of Mother Nature, Camille decided to bridge the two worlds through adventure and discovery, adopting a digital nomad life that took her across the country. The name of the blog comes from the corner in her room where Camille hung up tapestries that depicted beautiful landscapes juxtaposed against her Soho apartment. The goal of Camille's Corner is to show others that in every city, nature offers an escape, and no one has to choose only one world. </p>
                </div>
                <p >
                    <div style={{paddingBottom:"3%",paddingLeft:"45%"}}>
                    <Button style={{backgroundColor:"#4C6357",border:"none"}} onClick={(e)=>{
                            history.push("/about");
                            e.stopPropagation();
                        }}>{"Learn More"}</Button>
                    </div>
                </p>
                </div>
        </div>
    );
    
}