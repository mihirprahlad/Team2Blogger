import React from "react";
import LazyHero from 'react-lazy-hero';
const titleStyle = {
    fontSize: 60
};
export default function Home() {
    return (
        <div>
                <LazyHero imageSrc="https://wallpaperaccess.com/full/647493.jpg" opacity={0.1} parallaxOffset={150}>
                    <h1 style={titleStyle}>Camille's Corner</h1>
                </LazyHero>
                
                {}
        </div>
    );
    
}