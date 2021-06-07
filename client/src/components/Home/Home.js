import React from "react";
import LazyHero from 'react-lazy-hero';

export default function Home() {
    return (
        <div>
                <LazyHero imageSrc="https://wallpaperaccess.com/full/647493.jpg" opacity={0.1}>
                    <h1 style={{fontFamily: "Verdana", fontSize: 40}}>The Camille Connection</h1>
                </LazyHero>
                <h1 style={{fontFamily: "Verdana", margin: "50px"}}>About</h1>
                <h2 style={{fontFamily: "Verdana", margin: "50px"}}>Content here </h2>
                {}
        </div>
    );
    
}