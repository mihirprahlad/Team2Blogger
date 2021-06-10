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
document.body.style='background:beige;';
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
        <div>
                <LazyHero imageSrc="https://wallpaperaccess.com/full/647493.jpg" style={{height:"300px"}}opacity={0.35} parallaxOffset={150}>
                    <h1 style={titleStyle}>C A M I L L E</h1>
                </LazyHero>
                <div style={{marginTop:20, display:"flex", flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
                    {posts?(posts.slice(0,1).concat(posts.slice(2,3)).map((post)=>{return(<PostCard postContent={post}/>)})):(
                    <div class="center">
                    <Spinner animation="grow"/>           
                    </div>)}
                </div>

                <div style={{marginRight:300,marginLeft:300,marginBottom:20}}>
                    <p style={aboutTextStyle}>Camille is a recent college graduate from UVA currently traveling from city to city exploring what urban life offers while taking advantage of any opportunity to get back to the great outdoors. Exclusively working for new start-ups as a freelancer, she has been able to have extended stays in NYC, Denver, SF, Seattle, and Barcelona. She loves being a digital nomad because each new city brings new stories and opportunities. </p>
                    <p style={aboutTextStyle}>Camille is a Virgo Libra cusp. Her hobbies include hiking, climbing, yoga, snowboarding, and anything with music. Her favorite  parts of nature are trees, mountains, and rivers; her favorite parts of cities are music and rooftops. </p>
                    <div style={{height:15,width:110,backgroundColor:"#4C6357"}}></div>
                </div>
                <p style={aboutTextStyle}>
                    <div style={{paddingLeft:"48%",paddingBottom:"3%"}}>
                    <Button style={{backgroundColor:"#4C6357",border:"none"}} onClick={(e)=>{
                            history.push("/about");
                            e.stopPropagation();
                        }}>{"Learn More"}</Button>
                    </div>
                </p>
                
                {}
        </div>
    );
    
}