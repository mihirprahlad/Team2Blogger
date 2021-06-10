import React from "react";
import LazyHero from 'react-lazy-hero';
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

const titleStyle = {
    fontSize: 65

};
const aboutTextStyle = {
    margin: "30px",
    fontSize: 24
};

export default function Home() {
    const history = useHistory();
    return (
        <div>
                <LazyHero imageSrc="https://wallpaperaccess.com/full/647493.jpg" opacity={0.35} parallaxOffset={150}>
                    <h1 style={titleStyle}>Camille's Corner</h1>
                </LazyHero>
                <div>
                    <p style={aboutTextStyle}>Camille is a recent college graduate from UVA currently traveling from city to city exploring what urban life offers while taking advantage of any opportunity to get back to the great outdoors. Exclusively working for new start-ups as a freelancer, she has been able to have extended stays in NYC, Denver, SF, Seattle, and Barcelona. She loves being a digital nomad because each new city brings new stories and opportunities. </p>
                    <p style={aboutTextStyle}>Camille is a Virgo Libra cusp. Her hobbies include hiking, climbing, yoga, snowboarding, and anything with music. Her favorite  parts of nature are trees, mountains, and rivers; her favorite parts of cities are music and rooftops. </p>
                </div>
                <p style={aboutTextStyle}>
                    <Button variant="success" onClick={(e)=>{
                            console.log("aasdf");
                            history.push("/about");
                            e.stopPropagation();
                        }}>{"Learn More"}</Button>
                </p>
                
                {}
        </div>
    );
    
}